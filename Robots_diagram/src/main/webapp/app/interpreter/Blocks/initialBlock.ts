class InitialBlock extends Block {

    static run(node, graph, nodesMap, linksMap, env, timeline): string {

        var output = "Initial" + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        if (links.length == 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        }
        else if (links.length > 1) {
            Block.error(timeline, "Error: too many links from Initial block");
        }

        return output;
    }
}
