class Motors extends Block {
    static run(node, graph, nodesList, forward, env): string {
        var output = "Motors forward/backward" + "\n";
        var ports = [];
        var power = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Ports") {
                ports += properties[p].value.split(", ");
            }
            if (p == "Power (%)") {
                power = parseInt(properties[p].value);
            }
        }
        output += "Ports: " + ports + "\n" + "Power: " + power + "\n";

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