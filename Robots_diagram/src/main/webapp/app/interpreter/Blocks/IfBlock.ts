class IfBlock extends Block {
    static run(node, graph, nodesList, env): string {
        var output = "If" + "\n";
        var condition = "";
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Condition") {
                condition = properties[p].value;
            }
        }

        var parser = new Parser(condition, env);
        parser.parseExpression();
        if (parser.error == null) {
            output += "Condition: " + parser.result + "\n";
        }
        else {
            output += "Condition: " + parser.error + "\n";
        }

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