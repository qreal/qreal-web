/*
 * Copyright Anton Gulikov
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

class SwitchBlock extends ConditionBlock {

    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "Switch\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        var condition: string = SwitchBlock.getCondition(node);
        var parser = new Parser();
        try {
            var parseResult: string = parser.parseExpression(condition).toString();
            var isFound: boolean = false;
            var nextNode;
            var otherwiseNode;
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var messageOnLink = SwitchBlock.getGuard(linksMap[link.id]);
                if (messageOnLink === parseResult) {
                    isFound = true;
                    nextNode = nodesMap[link.get('target').id];
                    break;
                }
                if (messageOnLink === "") {
                    otherwiseNode = nodesMap[link.get('target').id];
                }
            }

            if (isFound) {
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
            } else {
                output += Factory.run(otherwiseNode, graph, nodesMap, linksMap, env, timeline) + "\n";
            }

        } catch (error) {
            output += "Error: " + error.message + "\n";
        }

        return output;
    }
    
}