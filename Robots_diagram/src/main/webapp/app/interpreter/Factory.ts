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

/// <reference path="Blocks/AbstractBlock.ts" />
/// <reference path="Blocks/ConditionBlock.ts" />
/// <reference path="Blocks/InitialBlock.ts" />
/// <reference path="Blocks/FinalBlock.ts" />
/// <reference path="Blocks/IfBlock.ts" />
/// <reference path="Blocks/FunctionBlock.ts" />
/// <reference path="Blocks/Motors.ts" />
/// <reference path="Blocks/MotorsStop.ts" />
/// <reference path="Blocks/Timer.ts" />
/// <reference path="Blocks/SwitchBlock.ts" />
/// <reference path="Blocks/MarkerBlock.ts" />
/// <reference path="Blocks/RandomInitBlock.ts" />
/// <reference path="Blocks/VariableInitBlock.ts" />
/// <reference path="Parser/Parser.ts" />

class Factory {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "";
        switch (node.type) {
            case "InitialNode":
                output += InitialBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "FinalNode":
                output += FinalBlock.run(node, graph, timeline);
                break;

            case "IfBlock":
                output += IfBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Function":
                output += FunctionBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "TrikV6EnginesForward":
                output += Motors.run(node, graph, nodesMap, linksMap, true, env, timeline);
                break;

            case "TrikV6EnginesBackward":
                output += Motors.run(node, graph, nodesMap, linksMap, false, env, timeline);
                break;

            case "TrikV6EnginesStop":
                output += MotorsStop.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Timer":
                output += Timer.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Switch":
                output += SwitchBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "MarkerUp":
                output += MarkerBlock.run(node, graph, nodesMap, linksMap, env, timeline, false);
                break;

            case "MarkerDown":
                output += MarkerBlock.run(node, graph, nodesMap, linksMap, env, timeline, true);
                break;
            
            case "VariableInit":
                output += VariableInitBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;

            case "Randomizer":
                output += RandomInitBlock.run(node, graph, nodesMap, linksMap, env, timeline);
                break;
            
            default:
                output += "Not yet";
        }
        return output;
    }
}