/*
 * Copyright Vladimir Zakharov
 * Copyright Anastasia Kornilova
 * Copyright Lidiya Chernigovskaya
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

    static exportSavingDiagramStateToJSON(name: string, folderId: number,  nodesMap, linksMap): string {
        var json = {
            'diagram': {
                'name': name,
                'nodes': [],
                'links': []
            },
            'folderId': folderId
        };

        ExportManager.exportNodes(json.diagram, nodesMap);
        ExportManager.exportLinks(json.diagram, linksMap);

        return JSON.stringify(json);
    }

    static exportUpdatingDiagramStateToJSON(name: string, parentFolder,  nodesMap, linksMap): string {
        var json = {
            'diagramId': FolderTreeManager.getDiagramIdByName(name, parentFolder),
            'name': name,
            'nodes': [],
            'links': []
        }

        ExportManager.exportNodes(json, nodesMap);
        ExportManager.exportLinks(json, linksMap);

        return JSON.stringify(json);
    }


    static exportFolderToJSON(name: string, folderParentId: number): string {
        var json = {
            'folderName': name,
            'folderParentId': folderParentId,
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