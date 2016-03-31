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

class FunctionBlock extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var output = "Function: ";
        var properties = node.getProperties();
        var body = "";
        var initialization = true;
        for (var p in properties) {
            if (properties.hasOwnProperty(p)) {
                if (p == "Body") {
                    body = properties[p].value;
                    output += body + "\n";
                }
                else {
                    output += "Error, cannot get properties" + "\n";
                }
            }
        }

        var parser = new Parser(body);
        parser.parseFunction();
        if (parser.error != null) {
            output += "Error: " + parser.error + "\n";
        }
        else if (links.length == 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        }
        else {
            output += "Error: more than one link from Function node";
        }

        return output;
    }
}
