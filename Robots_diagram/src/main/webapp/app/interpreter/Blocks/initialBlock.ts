class InitialBlock extends Block {
    static run(node, graph, nodesList, env): string {
        var output = "Initial" + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        if (links.length == 1) {
            var nextNode = nodesList[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesList, env) + "\n";
        }
        else if (links.length > 1) {
            output += "Error: too many links\n"
        }

        return output;
    }
}
