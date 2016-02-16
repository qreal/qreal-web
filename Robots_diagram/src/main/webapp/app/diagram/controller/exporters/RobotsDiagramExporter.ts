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

/// <reference path="../../../diagramCore.d.ts" />
/// <reference path="../../../vendor.d.ts" />

class RobotsDiagramExporter extends DiagramExporter {

    public exportSavingDiagramStateToJSON(graph: joint.dia.Graph, diagramParts: DiagramParts,
                                          name: string, folderId: number) {
        var json = {
            'diagram': {
                'name': name,
                'nodes': [],
                'links': []
            },
            'folderId': folderId
        };

        json.diagram.nodes = this.exportNodes(graph, diagramParts);
        json.diagram.links = this.exportLinks(diagramParts);


        return json;
    }

    public exportUpdatingDiagramStateToJSON(graph: joint.dia.Graph, diagramParts: DiagramParts,
                                            name: string, parentFolder: Folder) {
        var json = {
            'diagramId': parentFolder.getDiagramIdByName(name),
            'name': name,
            'nodes': [],
            'links': []
        }

        json.nodes = this.exportNodes(graph, diagramParts);
        json.links = this.exportLinks(diagramParts);

        return json;
    }

}