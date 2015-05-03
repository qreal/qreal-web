class DiagramLoader {
    static load(response, graph: joint.dia.Graph, nodesMap, nodeTypesMap: NodeTypesMap): void {
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

                logicalPropertiesObject.sort(function(a: any, b: any){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })

                for (var j = 0; j < logicalPropertiesObject.length; j++) {
                    var propertyName = logicalPropertiesObject[j].name;
                    if (typeProperties.hasOwnProperty(propertyName)) {
                        var property: Property = new Property(typeProperties[propertyName].name,
                            logicalPropertiesObject[j].value, typeProperties[propertyName].type);
                        logicalProperties[propertyName] = property;
                    }
                }

                var graphicalPropertiesObject = nodeObject.graphicalProperties;

                var x: number = 0;
                var y: number = 0;
                for (var j = 0; j < graphicalPropertiesObject.length; j++) {
                    if (graphicalPropertiesObject[j].name === "position") {
                        var position: string = graphicalPropertiesObject[j].value;
                        var positionNums = this.parsePosition(position);
                        x = positionNums.x;
                        y = positionNums.y;
                    }
                }

                this.loadNode(graph, nodesMap, nodeObject.logicalId, nodeObject.type, x + offsetX, y + offsetY,
                    logicalProperties, nodeTypesMap[nodeObject.type].image);
            }
        }

        for (var i = 0; i < response.links.length; i++) {
            this.loadLink(graph, response.links[i], offsetX, offsetY);
        }
    }

    static loadNode(graph: joint.dia.Graph, nodesMap, id: string,
                      type: string, x: number, y: number, properties, image: string): void {
        var node: DiagramNode = new DefaultDiagramNode(type, x, y, properties, image, id);
        nodesMap[node.getElement().id] = node;
        graph.addCell(node.getElement());
    }

    static loadLink(graph: joint.dia.Graph, linkObject, offsetX: number, offsetY: number): void {
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

        var graphicalPropertiesObject = linkObject.graphicalProperties;
        var vertices =  this.loadVertices(graphicalPropertiesObject, offsetX, offsetY);

        var link: joint.dia.Link = new joint.dia.Link({
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: source },
            target: { id: target },
            vertices: vertices
        });
        graph.addCell(link);
    }

    static loadVertices(graphicalPropertiesObject, offsetX: number, offsetY: number) {
        var vertices = [];
        var linkPosition: {x: number; y: number};
        for (var j = 0; j < graphicalPropertiesObject.length; j++) {
            if (graphicalPropertiesObject[j].name === "configuration") {
                var configuration: string = graphicalPropertiesObject[j].value;
                var parts = configuration.split(" : ");

                for (var k = 1; k < parts.length - 2; k++) {
                    var positionNums = this.parsePosition(parts[k]);

                    vertices.push(
                        {
                            x : positionNums.x,
                            y : positionNums.y
                        }
                    )
                }
            }
            if (graphicalPropertiesObject[j].name === "position") {
                linkPosition = this.parsePosition(graphicalPropertiesObject[j].value);
            }
        }

        vertices.forEach(function (vertex: {x: number; y: number}) {
            vertex.x += linkPosition.x + offsetX;
            vertex.y += linkPosition.y + offsetY;
        });

        return vertices;
    }

    static parsePosition(position: string): {x: number; y: number} {
        var parts = position.split(", ");
        return {x: parseFloat(parts[0]), y: parseFloat(parts[1])};
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