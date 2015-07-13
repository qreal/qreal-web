class ExportManager {
    static exportDiagramStateToJSON(name: string, nodesMap, linksMap): string {
        var json = {
            'name': name,
            'nodes': [],
            'links': []
        };

        ExportManager.exportNodes(json, nodesMap);
        ExportManager.exportLinks(json, linksMap);

        return JSON.stringify(json);
    }

    static exportFolderToJSON(name: string, currentFolder: string): string {
        var json = {
            'folderName': name,
            'folderParent': currentFolder
        }

        return JSON.stringify(json);
    }

    private static exportNodes(json, nodesMap) {
        for (var id in nodesMap) {
            var node: DiagramNode = nodesMap[id];
            var nodeJSON = {
                'jointObjectId': node.getJointObject().id,
                'type': node.getType(),
                'x': node.getX(),
                'y': node.getY(),
                'properties': []
            };

            nodeJSON.properties = ExportManager.exportProperties(node.getProperties());

            json.nodes.push(nodeJSON);
        }
    }

    private static exportLinks(json, linksMap) {
        for (var id in linksMap) {
            var link: Link = linksMap[id];
            var jointObject = link.getJointObject();
            var vertices = [];
            if (jointObject.get('vertices')) {
                vertices = ExportManager.exportVertices(jointObject.get('vertices'));
            }
            var linkJSON = {
                'jointObjectId': jointObject.id,
                'source': jointObject.get('source').id,
                'target': jointObject.get('target').id,
                'vertices' : vertices,
                'properties': []
            };

            linkJSON.properties = ExportManager.exportProperties(link.getProperties());

            json.links.push(linkJSON);
        }
    }

    private static exportProperties(properties: PropertiesMap) {
        var propertiesJSON = [];
        var position: number = 1;
        for (var propertyName in properties) {
            var property = {
                'name': propertyName,
                'value': properties[propertyName].value,
                'type': properties[propertyName].type,
                'position': position
            };
            propertiesJSON.push(property);
            position++;
        }
        return propertiesJSON;
    }

    private static exportVertices(vertices) {
        var verticesJSON = [];
        var count: number = 1;
        vertices.forEach(function (vertex) {
            verticesJSON.push(
                {
                    x : vertex.x,
                    y : vertex.y,
                    number : count
                }
            );
            count++;
        });
        return verticesJSON;
    }
}