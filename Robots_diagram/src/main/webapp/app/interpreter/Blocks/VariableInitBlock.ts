class VariableInitBlock extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "Variable Initialization" + "\n";

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        var variableName = "";
        var variableValue = "";

        for (var p in properties) {
            if (p == "Value") {
                variableValue = properties[p].value;
            }
            if (p == "Variable") {
                variableName = properties[p].value;
                if (variableValue != "") {
                    InterpretManager.setVariable(variableName, variableValue);
                }
            }
        }

        if (links.length == 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        }
        else if (links.length > 1) {
            output += "Error: too many links\n";
        }

        return output;
    }
}