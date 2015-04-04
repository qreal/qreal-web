class ImportManager {
    static import(response, graph: joint.dia.Graph, nodesList): number {
        console.log("import diagram");
        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];

            var properties: PropertiesMap = {};
            var propertiesObject = nodeObject.properties;

            for (var j = 0; j < propertiesObject.length; j++) {
                var property: Property = new Property(propertiesObject[j].value, propertiesObject[j].type);
                properties[propertiesObject[j].name] = property;
            }

            this.importNode(graph, nodesList, nodeObject.name, nodeObject.type, nodeObject.x,
                nodeObject.y, properties, nodeObject.image);
        }

        for (var i = 0; i < response.links.length; i++) {
            var linkObject = response.links[i];
            this.importLink(graph, nodesList, linkObject.source, linkObject.target, linkObject.vertices);
        }

        return response.nodeIndex;
    }

    static importNode(graph: joint.dia.Graph, nodesList, name: string,
                      type: string, x: number, y: number, properties, image: string): void {
        var node: DefaultDiagramNode = new DefaultDiagramNode(name, type, x, y, properties, image);
        nodesList[node.getElement().id] = node;
        graph.addCell(node.getElement());
    }

    static importLink(graph: joint.dia.Graph, nodesList, sourceNodeId:string, targetNodeId:string, vertices): void {
        var sourceId: string = this.getElementIdByNodeId(nodesList, sourceNodeId);
        var targetId: string = this.getElementIdByNodeId(nodesList, targetNodeId);
        var newVertices = this.importVertices(vertices);
        var link: joint.dia.Link = new joint.dia.Link({
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: sourceId },
            target: { id: targetId },
            vertices: newVertices
        });
        graph.addCell(link);
    }

    static importVertices(vertices) {
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

    static getElementIdByNodeId(nodesList, nodeId:string): string {
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node = nodesList[id];
                if (node.getName() === nodeId) {
                    return id;
                }
            }
        }
        return undefined;
    }
}