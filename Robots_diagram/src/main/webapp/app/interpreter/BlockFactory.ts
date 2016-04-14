/*
 * Copyright Vladimir Zakharov
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
/// <reference path="Blocks/MotorsBlock.ts" />
/// <reference path="Blocks/MotorsDirectionBlock.ts" />
/// <reference path="Blocks/InitialBlock.ts" />
/// <reference path="Blocks/FinalBlock.ts" />
/// <reference path="Blocks/IfBlock.ts" />
/// <reference path="Blocks/FunctionBlock.ts" />
/// <reference path="Blocks/MotorsForwardBlock.ts" />
/// <reference path="Blocks/MotorsBackwardBlock.ts" />
/// <reference path="Blocks/MotorsStopBlock.ts" />
/// <reference path="Blocks/TimerBlock.ts" />
/// <reference path="Blocks/SwitchBlock.ts" />
/// <reference path="Blocks/MarkerUpBlock.ts" />
/// <reference path="Blocks/MarkerDownBlock.ts" />
/// <reference path="Blocks/VariableInitBlock.ts" />
/// <reference path="Blocks/RandomInitBlock.ts" />
/// <reference path="Parser.ts" />

class BlockFactory {

    public createBlock(node: DiagramNode, outboundLinks: Link[], interpreter: Interpreter, 
                       robotModels: RobotModel[]): AbstractBlock {
        switch (node.getType()) {
            case "InitialNode":
                return new InitialBlock(node, outboundLinks);
            case "FinalNode":
                return new FinalBlock(node, outboundLinks);
            case "IfBlock":
                return new IfBlock(node, outboundLinks, interpreter);
            case "Function":
                return new FunctionBlock(node, outboundLinks, interpreter);                
            case "TrikV6EnginesForward":
                return new MotorsForwardBlock(node, outboundLinks, robotModels, interpreter);
            case "TrikV6EnginesBackward":
                return new MotorsBackwardBlock(node, outboundLinks, robotModels, interpreter);
            case "TrikV6EnginesStop":
                return new MotorsStopBlock(node, outboundLinks, robotModels);
            case "Timer":
                return new TimerBlock(node, outboundLinks, interpreter);
            case "SwitchBlock":
                return new SwitchBlock(node, outboundLinks, interpreter);
            case "MarkerUp":
                return new MarkerUpBlock(node, outboundLinks, robotModels);
            case "MarkerDown":
                return new MarkerDownBlock(node, outboundLinks, robotModels);
            case "VariableInit":
                return new VariableInitBlock(node, outboundLinks, interpreter);
            case "Randomizer":
                return new RandomInitBlock(node, outboundLinks, interpreter);
            case "FiBlock":
                return new EndIfBlock(node, outboundLinks);
            case "TrikSadSmile":
                return new TrikSadSmileBlock(node, outboundLinks, robotModels);
            case "TrikSmile":
                return new TrikSmileBlock(node, outboundLinks, robotModels);
            default:
                throw new Error("Block is not supported");
        }
    }

}