class DiagramLoader {
    static load(response, graph: joint.dia.Graph, nodesMap, nodeTypesMap: NodeTypesMap): number {
        var minPos: {x: number; y: number} = this.findMinPosition(response, nodeTypesMap);
        var offsetX = (minPos.x < 0) ? (-minPos.x + 100) : 0;
        var offsetY = (minPos.y < 0) ? (-minPos.y + 100) : 0;

        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var type = nodeObject.type;

            if (nodeTypesMap[type]) {
                var logicalProperties: PropertiesMap = {};
                var logicalPropertiesObject = nodeObject.logicalProperties;

                var typeProperties = nodeTypesMap[nodeObject.type].properties;

                for (var j = 0; j < logicalPropertiesObject.length; j++) {
                    var propertyName = logicalPropertiesObject[j].name;
                    if (typeProperties.hasOwnProperty(propertyName)) {
                        var property: Property = new Property(logicalPropertiesObject[j].value, typeProperties[propertyName].type);
                        logicalProperties[propertyName] = property;
                    }
                }

                var graphicalPropertiesObject = nodeObject.graphicalProperties;

                var x: number = 0;
                var y: number = 0;
                for (var j = 0; j < graphicalPropertiesObject.length; j++) {
                    if (graphicalPropertiesObject[j].name === "position") {
                        var position: string = graphicalPropertiesObject[j].value;
                        var parts = position.split(", ");
                        x = parseFloat(parts[0]);
                        y = parseFloat(parts[1]);
                    }
                }

                this.loadNode(graph, nodesMap, nodeObject.logicalId, nodeObject.type, x + offsetX, y + offsetY,
                    logicalProperties, nodeTypesMap[nodeObject.type].image);
            }
        }

        for (var i = 0; i < response.links.length; i++) {
            var linkObject = response.links[i];
            var source: string = "";
            var target: string = "";

            var logicalPropertiesObject = linkObject.logicalProperties;

            for (var j = 0; j < logicalPropertiesObject.length; j++) {
                switch (logicalPropertiesObject[j].name) {
                    case "from":
                        source = this.parseId(logicalPropertiesObject[j].value);
                        break;
                    case "to":
                        target = this.parseId(logicalPropertiesObject[j].value);
                        break
                }
            }

            this.loadLink(graph, nodesMap, source, target, []);
        }

        return response.nodeIndex;
    }

    static loadNode(graph: joint.dia.Graph, nodesMap, id: string,
                      type: string, x: number, y: number, properties, image: string): void {
        var node: DiagramNode = new DefaultDiagramNode(type, x, y, properties, image, id);
        nodesMap[node.getElement().id] = node;
        graph.addCell(node.getElement());
    }

    static loadLink(graph: joint.dia.Graph, nodesMap, source: string, target: string, vertices): void {
        //var newVertices = this.loadVertices(vertices);
        var link: joint.dia.Link = new joint.dia.Link({
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: source },
            target: { id: target }
            //vertices: newVertices
        });
        graph.addCell(link);
    }

    static loadVertices(vertices) {
        var newVertices = [];
        vertices.forEach(function (vertex) {
            newVertices.push(
                {
                    x : vertex.x,
                    y : vertex.y
                }
            )
        });
        return newVertices;
    }

    static parseId(idString: string): string {
        var parts = idString.split("/");
        var id = parts[parts.length - 1];
        var expr = /{(.*)}/gi;
        return id.replace(expr, "$1");
    }

    static min(a: number, b: number): number {
        return (a < b) ? a : b;
    }

    static findMinPosition(response, nodeTypesMap: NodeTypesMap): {x: number; y: number} {
        var minX = 2000;
        var minY = 2000;

        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var type = nodeObject.type;

            if (nodeTypesMap[type]) {
                var graphicalPropertiesObject = nodeObject.graphicalProperties;

                var x:number = 0;
                var y:number = 0;
                for (var j = 0; j < graphicalPropertiesObject.length; j++) {
                    if (graphicalPropertiesObject[j].name === "position") {
                        var position:string = graphicalPropertiesObject[j].value;
                        var parts = position.split(", ");
                        x = parseFloat(parts[0]);
                        y = parseFloat(parts[1]);

                        minX = this.min(x, minX);
                        minY = this.min(y, minY);
                    }
                }
            }
        }

        return {x: minX, y: minY};
    }
}