class ExportManager {
    static exportVertices(vertices) {
        var count: number = 1;
        var newVertices = [];
        vertices.forEach(function (vertex) {
            newVertices.push(
                {
                    x : vertex.x,
                    y : vertex.y,
                    number : count
                }
            )
            count++;
        });
        return newVertices;
    }

    static exportDiagramStateToJSON(graph: joint.dia.Graph, nodeIndex: number, nodesList): string {
        var json = {
            'nodeIndex': nodeIndex,
            'nodes': [],
            'links': []
        };
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node: DiagramNode = nodesList[id];
                var newNode = {
                    'name': node.getName(),
                    'x': node.getX(),
                    'y': node.getY(),
                    'image': node.getImagePath(),
                    'properties': []
                };

                var properties: PropertiesMap = node.getProperties();
                for (var name in properties) {
                    var property = {
                        'name': name,
                        'value': properties[name]
                    };
                    newNode.properties.push(property);
                }

                json.nodes.push(newNode);
            }
        }

        graph.getLinks().forEach(function (link) {
            var src: string = nodesList[link.get('source').id].getName();
            var target: string = nodesList[link.get('target').id].getName();
            var vertices;
            if (link.get('vertices')) {
                vertices = ExportManager.exportVertices(link.get('vertices'));
            }
            var newLink = {
                'source' : src,
                'target' : target,
                'vertices' : vertices
            };
            json.links.push(newLink);
        });

        return JSON.stringify(json);
    }
}