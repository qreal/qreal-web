class InterpretManager {
    static interpret(graph: joint.dia.Graph, nodesList): string {
        var elements = graph.getElements();
        var links = graph.getLinks();
        var output = "";

        if (elements.length > 0) {
            if (links.length > 0) {
                var firstNodeId = InterpretManager.findInitialNode(nodesList);
                if (firstNodeId != "") {
                    output += Factory.run(nodesList[firstNodeId]);
                }
                else {
                    output += "No initial node";
                }
            }
            else {
                output += "No links";
            }
        }
        else {
            output += "No elements";
        }

        return output;
    }

    static findInitialNode(nodesList) {
        var firstNodeId = "";
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node = nodesList[id];
                if (node.type == "Initial Node") {
                    firstNodeId = id;
                    break;
                }
            }
        }
        return firstNodeId;
    }
}