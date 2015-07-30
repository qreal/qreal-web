class FunctionBlock extends Block {

    static run(node, graph, nodesMap, linksMap, env, timeline): string {

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var output = "Function: ";
        var body = "";
        var initialization = true;

        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Body") {
                body = properties[p].value;
                output += body + "\n";
            }
            if (p == "Initialization") {
                initialization = properties[p].value;
            }
        }

        var parser = new Parser(body, env);
        parser.parseAssignments();
        if (parser.error != null) {
            Block.error(timeline, "Parser error in Function block: " + parser.error + "\n");
        }
        else if (links.length == 1) {
            var nextNode = nodesMap[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
        }
        else {
            Block.error(timeline, "Error: more than one link from Function block");
        }

        return output;
    }
}
