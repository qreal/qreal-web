class FunctionBlock extends Block {
    static run(node, graph, nodesList, env): string {
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var output = "Function: ";
        var properties = node.getProperties();
        var body = "";
        var initialization = true;
        for (var p in properties) {
            if (properties.hasOwnProperty(p)) {
                if (p == "Body") {
                    body = properties[p].value;
                }
                else if (p == "Initialization") {
                    initialization = properties[p].value;
                }
                else {
                    output += "Error, cannot get properties" + "\n";
                }
            }
        }

        var parser = new Parser(body, env);
        parser.parseAssignments();
        if (parser.error != null) {
            output += parser.error + "\n";
        }
        else if (links.length == 1) {
            var nextNode = nodesList[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesList, env) + "\n";
        }
        else {
            // error
        }

        return output;
    }
}
