class LoopBlock extends Block {

    static loopBlocksIds = [];
    static loopBlocksIterations = {};

    static run(node, graph, nodesMap, linksMap, env, timeline): string {

        var output = "Loop" + "\n";
        var iterations = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        // Figuring out number of iterations
        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Iterations") {
                var parser = new Parser(properties[p].value, env);
                parser.parseExpression();
                if (parser.error == null) {
                    iterations = parser.result;
                    if (iterations < 0) {
                        Block.error(timeline, "Error: negative number of iterations in Loop block");
                    }
                    else {
                        output += "Iterations: " + iterations + "\n";
                    }
                }
                else {
                    Block.error(timeline, "Parser error in Loop block" + parser.error + "\n");
                }
            }
        }

        // Saving current node id
        if (!InterpretManager.error) {
            var sizeOfLoopBlockIds = LoopBlock.loopBlocksIds.length;
            var iteration;
            if (sizeOfLoopBlockIds > 0) {
                var lastLoopId = LoopBlock.loopBlocksIds[sizeOfLoopBlockIds - 1];
                if (nodeId == lastLoopId) {
                    LoopBlock.loopBlocksIterations[nodeId]--; // we've already been in current node
                    if (LoopBlock.loopBlocksIterations[nodeId] == 0) { // end of loop
                        LoopBlock.loopBlocksIds.pop();
                        delete LoopBlock.loopBlocksIterations[nodeId];
                        iteration = false;
                    }
                    else {
                        iteration = true;
                    }
                }
                else {
                    LoopBlock.loopBlocksIds.push(nodeId);
                    LoopBlock.loopBlocksIterations[nodeId] = iterations;
                    iteration = true;
                }
            }
            else {
                LoopBlock.loopBlocksIds.push(nodeId);
                LoopBlock.loopBlocksIterations[nodeId] = iterations;
                iteration = true;
            }

            // Figuring out the next node
            if (links.length == 2) {
                var link0 = links[0];
                var link1 = links[1];
                var link0Guard = LoopBlock.getGuard(linksMap[link0.id]);
                var link1Guard = LoopBlock.getGuard(linksMap[link1.id]);
                var nextNode;
                if (link0Guard == "iteration" && link1Guard == "") {
                    nextNode = (iteration) ? nodesMap[link0.get('target').id] : nodesMap[link1.get('target').id];
                }
                else if (link0Guard == "" && link1Guard == "iteration") {
                    nextNode = (iteration) ? nodesMap[link1.get('target').id] : nodesMap[link0.get('target').id];
                }
                else {
                    Block.error(timeline, "Error: must be 2 links (iteration and blank) from Loop block");
                }
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline);
            }
            else {
                Block.error(timeline, "Error: must be 2 links (iteration and blank) from Loop block");
            }
        }

        return output;
    }

    static getGuard(link : Link) {
        var guard = "";
        var properties = link.getProperties();
        for (var p in properties) {
            if (p == "Guard") {
                guard = properties[p].value;
            }
        }
        return guard;
    }
}