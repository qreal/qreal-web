/*
 * Copyright Lada Gagina
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

class Factory {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "";
        switch (node.type) {
            case "Initial Node":
                output += InitialBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Final Node":
                output += FinalBlock.run(node, graph, timeline);
                break;

            case "Condition":
                output += IfBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Function":
                output += FunctionBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Motors Forward":
                output += Motors.run(node, graph, nodesMap, linksMap, true, env, timeline);
                break;

            case "Motors Backward":
                output += Motors.run(node, graph, nodesMap, linksMap, false, env, timeline);
                break;

            case "Stop Motors":
                output += MotorsStop.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Timer":
                output += Timer.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Switch":
                output += SwitchBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Marker Up":
                output += MarkerBlock.run(node, graph, nodesMap, linksMap, env, timeline, false);
                break;

            case "Marker Down":
                output += MarkerBlock.run(node, graph, nodesMap, linksMap, env, timeline, true);
                break;

            case "Variable Initialization":
                output += VariableInitBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Random Initialization":
                output += RandomInitBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;
            
            default:
                output += "Not yet";
        }
        return output;
    }
}