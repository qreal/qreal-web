class RandomInitBlock extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "Random Initialization" + "\n";

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        var variableName = "";
        var minValue = 0;
        var maxValue = 0;

        for (var p in properties) {
            if (p == "Variable") {
                variableName = properties[p].value;
            } else if (p == "From") {
                minValue = +properties[p].value;
            } else if (p == "To") {
                maxValue = +properties[p].value;
            }
        }
        InterpretManager.setVariable(variableName, (Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue).toString());

        var testVarValue = InterpretManager.getVariablesMap()[variableName];

        if (links.length == 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        } else if (links.length > 1) {
            output += "Error: too many links\n";
        }

        return output;
    }
}