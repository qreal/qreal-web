class InterpretManager {
    static interpret(graph: joint.dia.Graph, nodesList): string {
        var elements = graph.getElements();
        var links = graph.getLinks();
        var output = "";
        var env = {};

        if (elements.length > 0) {
            if (links.length > 0) {
                var firstNodeId = InterpretManager.findInitialNode(nodesList);
                if (firstNodeId != "") {
                    output += Factory.run(nodesList[firstNodeId], graph, nodesList, env);
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

    static getIdByNode(node, nodesList): string {
        for (var property in nodesList) {
            if (nodesList.hasOwnProperty(property)) {
                if (nodesList[property] === node)
                    return property;
            }
    }
}
}