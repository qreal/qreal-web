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

class MarkerBlock extends AbstractBlock {

    static run(node, graph, nodesMap, linksMap, env, timeline, isUp : boolean): string {
        var output : string = "Marker " + ((isUp) ? "UP" : "DOWN") + "\n";

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        if (links.length === 0) {
            output += "Too small links";
        } else if (links.length > 1) {
            output += "Too much links";
        }

        var models = timeline.getRobotModels();
        var color: string = node.getChangeableProperties()["Color"].value;

        for (var modelId = 0; modelId < models.length; modelId++) {
            var model = models[modelId];
            model.setMarkerDown(isUp);
            model.setMarkerColor(color);
        }

        if (links.length == 1) {
            var link = links[0];
            var nextNode = nodesMap[link.get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline);
        }

        return output;
    }

}