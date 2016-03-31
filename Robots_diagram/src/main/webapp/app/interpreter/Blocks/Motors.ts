/*
 * Copyright Lada Gagina
 * Copyright Anton Gulikov
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

class Motors extends AbstractBlock {
    
    static run(node, graph, nodesMap, linksMap, forward, env, timeline): string {

        var output = "Motors forward/backward" + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        
        var properties = node.getChangeableProperties();
        var ports = properties["Ports"].value.replace(/ /g,'').split(",");

        var power = 0;
        var parser = new Parser();
        try {
            power = parser.parseExpression(properties["Power"].value);
            var models = timeline.getRobotModels();
            var model = models[0];
            if (power < 0 || power > 100) {
                AbstractBlock.error(timeline, "Error: incorrect power value in Motors Forward(Backward) block" +
                    " (must be between 0 and 100)");
            } else {
                output += "Ports: " + ports + "\n" + "Power: " + power + "\n";
            }
            power = (forward) ? power : -power;

            for (var i = 0; i < ports.length; i++) {
                var motor: Motor = <Motor> model.getDeviceByPortName(ports[i]);
                if (motor) {
                    motor.setPower(power);
                } else {
                    AbstractBlock.error(timeline, "Error: Incorrect port name " + ports[i] +
                        " in Motors Forward(Backward) block");
                }
            }

            if (links.length == 1) {
                var nextNode = nodesMap[links[0].get('target').id];
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline);
            } else if (links.length > 1) {
                AbstractBlock.error(timeline, "Error: too many links from Motors Forward(Backwards) block");
            } else {
                AbstractBlock.error(timeline, "Error: cannot find next node after Motors Forward(Backwards) block");
            }
        } catch (error) {
            AbstractBlock.error(timeline, "Parser error in Motors Forward(Backward) block: " + error.message + "\n");
        }

        return output;
    }
    
}
