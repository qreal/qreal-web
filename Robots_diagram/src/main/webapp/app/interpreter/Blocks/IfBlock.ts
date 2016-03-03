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

class IfBlock extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "If" + "\n";

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var condition = IfBlock.getCondition(node);
        var parser = new Parser(condition, env);
        parser.parseExpression();
        if (parser.error == null) {
            output += "Condition: " + parser.result + "\n";
        }
        else {
            output += "Condition: " + parser.error + "\n";
        }

        if (links.length == 2) {
            var link0 = links[0];
            var link1 = links[1];
            var link0Guard = IfBlock.getGuard(linksMap[link0.id]);
            var link1Guard = IfBlock.getGuard(linksMap[link1.id]);
            var nextNode;
            if (link0Guard == "true" && link1Guard == "false") {
                if (parser.result) {
                    nextNode = nodesMap[link0.get('target').id];
                }
                else {
                    nextNode = nodesMap[link1.get('target').id];
                }
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
            }
            else if (link0Guard == "false" && link1Guard == "true") {
                if (parser.result) {
                    nextNode = nodesMap[link1.get('target').id];
                }
                else {
                    nextNode = nodesMap[link0.get('target').id];
                }
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
            }
            else {
                output += "Error: there must be both true and false links";
            }
        }
        else {
            output += "Error: must be 2 links from If Node";
        }

        return output;
    }

    private static getCondition(node) {
        var condition = "";
        var properties = node.getChangeableProperties();
        for (var p in properties) {
            if (p == "Condition") {
                condition = properties[p].value;
            }
        }
        return condition;
    }

    private static getGuard(link : Link) {
        var guard = "";
        var properties = link.getChangeableProperties();
        for (var p in properties) {
            if (p == "Guard") {
                guard = properties[p].value;
            }
        }
        return guard;
    }
}