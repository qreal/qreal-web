/*
 * Copyright Vladimir Zakharov 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class ExportManager {
    static exportDiagramStateToJSON(graph, nodesMap, linksMap) {
        var json = {
            'nodes': [],
            'links': []
        };

        ExportManager.exportRobotsDiagramNode(json, nodesMap, linksMap);
        ExportManager.exportNodes(graph, json, nodesMap, linksMap);
        ExportManager.exportLinks(json, nodesMap, linksMap)

        return json;
    }

    static exportRobotsDiagramNode(json, nodesMap, linksMap): void {
        var robotsDiagramNode : RobotsDiagramNode = DiagramController.robotsDiagramNode;

        var graphicalChildren = [];
        for (var id in nodesMap) {
            var childrenId = {'id': nodesMap[id].getType() + "/{" + id + "}"};
            graphicalChildren.push(childrenId);
        }

        for (var id in linksMap) {
            var childrenId = {'id': linksMap[id].getType() + "/{" + id + "}"};
            graphicalChildren.push(childrenId);
        }

        var nodeJSON = {
            'logicalId': robotsDiagramNode.getLogicalId(),
            'graphicalId': robotsDiagramNode.getGraphicalId(),
            'graphicalParent': "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID",
            'type': robotsDiagramNode.getType(),
            'logicalChildren': [],
            'graphicalChildren': graphicalChildren,
            'logicalLinksIds': [],
            'graphicalLinksIds': [],
            'logicalProperties': [],
            'graphicalProperties': []
        }

        nodeJSON.logicalProperties = ExportManager.exportLogicalProperties(robotsDiagramNode.getProperties());

        var nameProperty = {
            'name': "name",
            'value': robotsDiagramNode.getName(),
            'type': "string",
        };
        nodeJSON.logicalProperties.push(nameProperty);
        nodeJSON.graphicalProperties.push(nameProperty);

        json.nodes.push(nodeJSON);
    }

    static exportNodes(graph, json, nodesMap, linksMap): void {
        for (var id in nodesMap) {
            var node: DiagramNode = nodesMap[id];
            var nodeJSON = {
                'logicalId': node.getLogicalId(),
                'graphicalId': node.getJointObject().id,
                'graphicalParent': "qrm:/RobotsMetamodel/RobotsDiagram/RobotsDiagramNode/{" +
                    DiagramController.robotsDiagramNode.getGraphicalId() + "}",
                'type': node.getType(),
                'logicalChildren': [],
                'graphicalChildren': [],
                'logicalLinksIds': [],
                'graphicalLinksIds': [],
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

            var nameProperty = {
                'name': "name",
                'value': node.getName(),
                'type': "string",
            };
            nodeJSON.logicalProperties.push(nameProperty);
            nodeJSON.graphicalProperties.push(nameProperty);

            var graphicalLinks = graph.getConnectedLinks(node.getJointObject(), { inbound: true, outbound: true });

            graphicalLinks.forEach(function (link) {
                nodeJSON.graphicalLinksIds.push({'id': link.id});
                nodeJSON.logicalLinksIds.push({'id': linksMap[link.id].getLogicalId()});
            });

            json.nodes.push(nodeJSON);
        }
    }

    static exportLinks(json, nodesMap, linksMap): void {
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
                'graphicalParent': "qrm:/RobotsMetamodel/RobotsDiagram/RobotsDiagramNode/{" +
                    DiagramController.robotsDiagramNode.getGraphicalId() + "}",
                'type': link.getType(),
                'children': [],
                'logicalLinksIds': [],
                'graphicalLinksIds': [],
                'logicalProperties': [],
                'graphicalProperties': []
            }

            linkJSON.logicalProperties = ExportManager.exportLogicalProperties(link.getProperties());

            var nameProperty = {
                'name': "name",
                'value': link.getName(),
                'type': "string",
            };
            linkJSON.logicalProperties.push(nameProperty);
            linkJSON.graphicalProperties.push(nameProperty);

            var sourceObject = nodesMap[jointObject.get('source').id];
            var targetObject = nodesMap[jointObject.get('target').id];

            var logicalSourceValue: string =  (sourceObject) ? sourceObject.getType() + "/{" + sourceObject.getLogicalId() + "}" :
                "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID";

            var logicalSource = {
                'name': "from",
                'value': logicalSourceValue,
                'type': "qReal::Id"
            }

            var logicalTargetValue: string =  (targetObject) ? targetObject.getType() + "/{" + targetObject.getLogicalId() + "}" :
                "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID";

            var logicalTarget = {
                'name': "to",
                'value': logicalTargetValue,
                'type': "qReal::Id"
            }

            linkJSON.logicalProperties.push(logicalSource);
            linkJSON.logicalProperties.push(logicalTarget);

            var graphicalSourceValue: string = (sourceObject) ? sourceObject.getType() + "/{" + jointObject.get('source').id + "}" :
                "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID";

            var graphicalSource = {
                'name': "from",
                'value': graphicalSourceValue,
                'type': "qReal::Id"
            }

            var graphicalTargetValue: string = (targetObject) ? targetObject.getType() + "/{" + jointObject.get('target').id + "}" :
                "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID";

            var graphicalTarget = {
                'name': "to",
                'value': graphicalTargetValue,
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