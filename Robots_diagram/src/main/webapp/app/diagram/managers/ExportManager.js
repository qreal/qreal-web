var ExportManager = (function () {
    function ExportManager() {
    }
    ExportManager.exportVertices = function (vertices) {
        var count = 1;
        var newVertices = [];
        vertices.forEach(function (vertex) {
            newVertices.push({
                x: vertex.x,
                y: vertex.y,
                number: count
            });
            count++;
        });
        return newVertices;
    };
    ExportManager.exportDiagramStateToJSON = function (graph, name, nodeIndex, nodesList) {
        var json = {
            'name': name,
            'nodeIndex': nodeIndex,
            'nodes': [],
            'links': []
        };
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node = nodesList[id];
                var newNode = {
                    'name': node.getName(),
                    'type': node.getType(),
                    'x': node.getX(),
                    'y': node.getY(),
                    'properties': []
                };
                var properties = node.getProperties();
                var position = 1;
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
            var src = nodesList[link.get('source').id].getName();
            var target = nodesList[link.get('target').id].getName();
            var vertices;
            if (link.get('vertices')) {
                vertices = ExportManager.exportVertices(link.get('vertices'));
            }
            var newLink = {
                'source': src,
                'target': target,
                'vertices': vertices
            };
            json.links.push(newLink);
        });
        return JSON.stringify(json);
    };
    return ExportManager;
})();
//# sourceMappingURL=ExportManager.js.map