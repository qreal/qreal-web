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

class Timer extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline):string {
        var output = "Timer" + "\n";
        var delay = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Delay (ms)") {
                var parser = new Parser(properties[p].value, env);
                parser.parseExpression();
                if (parser.error == null) {
                    delay = parser.result;
                    if (delay < 0) {
                        output += "Error: incorrect delay value";
                    }
                    else {
                        output += "Delay: " + delay + "\n";

                        if (links.length == 1) {
                            var nextNode = nodesMap[links[0].get('target').id];
                            setTimeout(function () { output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline); }, delay);
                        }
                        else if (links.length > 1) {
                            output += "Error: too many links\n";
                        }
                    }
                }
                else {
                    output += "Error: " + parser.error + "\n";
                }
            }
        }

        return output;
    }
}
