class RandomInitBlock extends AbstractBlock {
    
    static run(node, graph: joint.dia.Graph, nodesMap: Map<DiagramNode>, linksMap: Map<Link>, env, timeline): string {
        var output = "Random Initialization" + "\n";

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        
        var properties = node.getChangeableProperties();
        var variableName = properties["Variable"].value;
        var minValue = properties["LowerBound"].value;
        var maxValue = properties["UpperBound"].value;

        var parser: Parser = new Parser();
        try {
            minValue = parser.parseExpression(minValue);
            maxValue = parser.parseExpression(maxValue);
            InterpretManager.setVariable(variableName,
                (Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue).toString());

            if (links.length === 1) {
                var nextNode = nodesMap[links[0].get('target').id];
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
            } else if (links.length > 1) {
                AbstractBlock.error(timeline, "Error: too many links from Random Initialization block");
            } else {
                AbstractBlock.error(timeline, "Error: cannot find next node after Random Initialization block");
            }
        } catch (error) {
            AbstractBlock.error(timeline, "Parser error in Random Initialization block: " + error.message + "\n");
        }

        return output;
    }

}