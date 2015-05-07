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
                    var links = InterpretManager.getOutboundLinks(graph, firstNodeId);
                    output += Factory.run(nodesList[links[0].get('target').id]);
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

    static getOutboundLinks(graph, nodeId) {
        var e = graph.getCell(nodeId);
        var outboundLinks = graph.getConnectedLinks(e, { outbound : true });
        return outboundLinks;
    }
}