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

class MotorsStop extends AbstractBlock {
    
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "Motors stop" + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var ports = node.getChangeableProperties()["Ports"].value.replace(/ /g,'').split(",");
        output += "Ports: " + ports + "\n";

        var models = timeline.getRobotModels();
        var model = models[0];

        for (var i = 0; i < ports.length; i++) {
            var motor: Motor = <Motor> model.getDeviceByPortName(ports[i]);
            if (motor) {
                motor.setPower(0);
            } else {
                output += "Error: Incorrect port name " + ports[i];
            }
        }

        if (links.length === 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline);
        } else if (links.length > 1) {
            output += "Error: too many links\n";
        }

        return output;
    }
    
}