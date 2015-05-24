class ExportManager {
    static exportDiagramStateToJSON(nodesMap, linksMap) {
        var json = {
            'nodes': [],
            'links': []
        };

        ExportManager.exportNodes(json, nodesMap);
        ExportManager.exportLinks(json, nodesMap, linksMap)

        return json;
    }

    static exportNodes(json, nodesMap) {
        for (var id in nodesMap) {
            var node: DiagramNode = nodesMap[id];
            var nodeJSON = {
                'logicalId': node.getLogicalId(),
                'graphicalId': node.getJointObject().id,
                'type': node.getType(),
                'logicalProperties': [],
                'graphicalProperties': [
                    {
                        "name": "position",
                        "value": "" + node.getX() + ", " + node.getY(),
                        "type": "QPointF"
                    }
                ]
            };

            nodeJSON.logicalProperties = ExportManager.exportLogicalProperties(node.getProperties());

            json.nodes.push(nodeJSON);
        }
    }

    static exportLinks(json, nodesMap, linksMap) {
        for (var id in linksMap) {
            var link: Link = linksMap[id];
            var jointObject = link.getJointObject();
            var vertices = [];
            if (jointObject.get('vertices')) {
                vertices = ExportManager.exportVertices(jointObject.get('vertices'));
            }
            var linkJSON = {
                'logicalId': link.getLogicalId(),
                'graphicalId': jointObject.id,
                'type': "ControlFlow",
                'logicalProperties': [],
                'graphicalProperties': []
            }

            linkJSON.logicalProperties = ExportManager.exportLogicalProperties(link.getProperties());

            var logicalSource = {
                'name': "from",
                'value': nodesMap[jointObject.get('source').id].getLogicalId(),
                'type': "qReal::Id"
            }

            var logicalTarget = {
                'name': "to",
                'value': nodesMap[jointObject.get('target').id].getLogicalId(),
                'type': "qReal::Id"
            }

            linkJSON.logicalProperties.push(logicalSource);
            linkJSON.logicalProperties.push(logicalTarget);

            var graphicalSource = {
                'name': "from",
                'value': jointObject.get('source').id,
                'type': "qReal::Id"
            }

            var graphicalTarget = {
                'name': "to",
                'value': jointObject.get('target').id,
                'type': "qReal::Id"
            }

            linkJSON.graphicalProperties.push(graphicalSource);
            linkJSON.graphicalProperties.push(graphicalTarget);

            json.links.push(linkJSON);
        }
    }

    static exportLogicalProperties(properties: PropertiesMap) {
        var propertiesJSON = [];
        for (var propertyName in properties) {
            var property = {
                'name': propertyName,
                'value': properties[propertyName].value,
                'type': properties[propertyName].type,
            };
            propertiesJSON.push(property);
        }

        return propertiesJSON;
    }

    static exportVertices(vertices) {
        var verticesJSON = [];
        var count: number = 1;
        vertices.forEach(function (vertex) {
            verticesJSON.push(
                {
                    x : vertex.x,
                    y : vertex.y,
                    number : count
                }
            )
            count++;
        });
        return verticesJSON;
    }
}