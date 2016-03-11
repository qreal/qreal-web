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

class InitialBlock extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "Initial" + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        if (links.length == 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        }
        else if (links.length > 1) {
            output += "Error: too many links\n"
        }

        return output;
    }
}
