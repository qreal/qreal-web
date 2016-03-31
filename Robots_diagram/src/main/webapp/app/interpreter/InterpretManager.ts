/*
 * Copyright Lada Gagina
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

class InterpretManager {
    static variablesMap: VariablesMap = {};

    static interpret(graph: joint.dia.Graph, nodesMap, linksMap, timeline): string {
        var elements = graph.getElements();
        var links = graph.getLinks();
        var output = "";
        var env = {};

        if (elements.length > 0) {
            if (links.length > 0) {
                var firstNodeId = InterpretManager.findInitialNode(nodesMap);
                if (firstNodeId != "") {
                    timeline.start();
                    output += Factory.run(nodesMap[firstNodeId], graph, nodesMap, linksMap, env, timeline);
                }
                else {
                    output += "No initial node";
                }
            }
            else {
                output += "No links";
            }
        }
        else {
            output += "No elements";
        }

        return output;
    }

    static findInitialNode(nodesMap) {
        var firstNodeId = "";
        for (var id in nodesMap) {
            if (nodesMap.hasOwnProperty(id)) {
                var node = nodesMap[id];
                if (node.type == "Initial Node") {
                    firstNodeId = id;
                    break;
                }
            }
        }
        return firstNodeId;
    }

    static getOutboundLinks(graph, nodeId) {
        var e = graph.getCell(nodeId);
        var outboundLinks = graph.getConnectedLinks(e, { outbound : true });
        return outboundLinks;
    }

    static getIdByNode(node, nodesMap): string {
        for (var property in nodesMap) {
            if (nodesMap.hasOwnProperty(property)) {
                if (nodesMap[property] === node)
                    return property;
            }
        }
    }

    static getVariablesMap() : VariablesMap {
        return this.variablesMap;
    }

    static setVariable(name: string, value: string) {
        this.variablesMap[name] = value;
    }
}