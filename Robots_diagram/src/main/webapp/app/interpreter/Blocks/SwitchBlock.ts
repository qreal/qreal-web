class SwitchBlock extends Block {

    static run(node, graph, nodesMap, linksMap, env, timeline): string {

        var output = "Switch\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        var condition : string = Block.getCondition(node);
        var parser = new Parser(condition, env);
        parser.parseExpression();
        var parseResult : string = parser.result.toString();
        var isFound : boolean = false;
        var nextNode;
        var otherwiseNode;
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var messageOnLink = Block.getGuard(linksMap[link.id]);
            if (messageOnLink === parseResult) {
                isFound = true;
                nextNode = nodesMap[link.get('target').id];
                break;
            }
            if (messageOnLink === "false") {
                otherwiseNode = nodesMap[link.get('target').id];
            }
        }
        output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        return output;
    }
}
