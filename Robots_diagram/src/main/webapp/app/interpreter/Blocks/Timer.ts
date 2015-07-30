class Timer extends Block {

    static run(node, graph, nodesMap, linksMap, env, timeline): string {

        var output = "Timer" + "\n";
        var delay = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Delay (ms)") {
                var parser = new Parser(properties[p].value, env);
                parser.parseExpression();
                if (parser.error == null) {
                    delay = parser.result;
                    if (delay < 0) {
                        Block.error(timeline, "Error: incorrect delay value in Timer block");
                    }
                    else {
                        output += "Delay: " + delay + "\n";
                    }
                }
                else {
                    Block.error(timeline, "Parser error in Timer block: " + parser.error + "\n");
                }
            }
        }

        // Figuring out next block
        if (!InterpretManager.error) {
            if (links.length == 1) {
                var nextNode = nodesMap[links[0].get('target').id];
                setTimeout(function () { output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline); }, delay);
            }
            else {
                Block.error(timeline, "Error: too many links from Timer block");
            }
        }

        return output;
    }
}
