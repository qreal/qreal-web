class VariableInitBlock extends AbstractBlock {
    
    static run(node, graph, nodesMap, linksMap, env, timeline): string {
        var output = "Variable Initialization" + "\n";

        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        var properties = node.getChangeableProperties();
        var variableName = properties["variable"].value;
        var variableValue = properties["value"].value;

        var parser = new Parser();
        parser.parseExpression(variableValue);

        if (!parser.getError()) {
            InterpretManager.setVariable(variableName, parser.getResult());

            if (links.length == 1) {
                var nextNode = nodesMap[links[0].get('target').id];
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline) + "\n";
            } else if (links.length > 1) {
                output += "Error: too many links\n";
            }
        } else {
            output += "Error: " + parser.getError() + "\n";
        }
        
        return output;
    }
    
}