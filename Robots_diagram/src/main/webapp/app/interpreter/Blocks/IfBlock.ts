class IfBlock extends Block {
    static run(node, graph, nodesMap, linksMap, env, timeline): string {

        var output = "If" + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        var condition = Block.getCondition(node);

        var parser = new Parser(condition, env);
        parser.parseExpression();
        if (parser.error == null) {
            output += "Condition: " + parser.result + "\n";
        }
        else {
            Block.error(timeline, "Parser error in If block: " + parser.error + "\n");
        }

        if (!InterpretManager.error) {
            if (links.length == 2) {
                var link0 = links[0];
                var link1 = links[1];
                var link0Guard = Block.getGuard(linksMap[link0.id]);
                var link1Guard = Block.getGuard(linksMap[link1.id]);
                var nextNode;

                if (link0Guard == "true" && link1Guard == "false") {
                    if (parser.result) {
                        nextNode = nodesMap[link0.get('target').id];
                    }
                    else {
                        nextNode = nodesMap[link1.get('target').id];
                    }
                    output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
                }
                else if (link0Guard == "false" && link1Guard == "true") {
                    if (parser.result) {
                        nextNode = nodesMap[link1.get('target').id];
                    }
                    else {
                        nextNode = nodesMap[link0.get('target').id];
                    }
                    output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
                }
                else {
                    Block.error(timeline, "Error: there must be both true and false links from If block");
                }
            }
            else {
                Block.error(timeline, "Error: there must be 2 links from If block");
            }
        }

        return output;
    }
}
