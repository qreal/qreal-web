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

    static exportDiagramStateToJSON(graph: joint.dia.Graph,  name: string, nodeIndex: number, nodesList): string {
        var json = {
            'name': name,
            'nodeIndex': nodeIndex,
            'nodes': [],
            'links': []
        };
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node: DiagramNode = nodesList[id];
                var newNode = {
                    'name': node.getName(),
                    'type': node.getType(),
                    'x': node.getX(),
                    'y': node.getY(),
                    'properties': []
                };

                var properties: PropertiesMap = node.getProperties();
                var position: number = 1;
                for (var propertyName in properties) {
                    var property = {
                        'name': propertyName,
                        'value': properties[propertyName].value,
                        'type': properties[propertyName].type,
                        'position': position
                    };
                    newNode.properties.push(property);
                    position++;
                }

                json.nodes.push(newNode);
            }
        }

        graph.getLinks().forEach(function (link) {
            console.log(link.get('target'));
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