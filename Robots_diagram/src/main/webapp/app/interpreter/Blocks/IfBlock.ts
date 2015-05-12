class IfBlock extends Block {
    static run(node, graph, nodesList): string {
        var output = "If: " + node.getName() + "\n";
        var condition = "";
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Condition") {
                condition = properties[p].value;
            }
        }
        output += "Condition: " + condition + "\n";

        if (links.length == 2) {
           // var nextNode = nodesList[links[0].get('target').id];
           // output += Factory.run(nextNode, graph, nodesList) + "\n";
        }
        else {
            // error
        }

        return output;
    }
}