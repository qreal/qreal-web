class MotorsStop extends Block {
    static run(node, graph, nodesList, env): string {
        var output = "Motors stop" + "\n";
        var ports = [];
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Ports") {
                ports += properties[p].value.split(",");
            }
        }
        output += "Ports: " + ports + "\n";

        if (links.length == 1) {
            var nextNode = nodesList[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesList, env);
        }
        else if (links.length > 1) {
            output += "Error: too many links\n";
        }

        return output;
    }
}