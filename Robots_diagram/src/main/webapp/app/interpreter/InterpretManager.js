var InterpretManager = (function () {
    function InterpretManager() {
    }
    InterpretManager.interpret = function (graph, nodesList) {
        var elements = graph.getElements();
        var links = graph.getLinks();
        var output = "";
        if (elements.length > 0) {
            if (links.length > 0) {
                var firstNodeId = InterpretManager.findInitialNode(nodesList);
                if (firstNodeId != "") {
                    output += Factory.run(nodesList[firstNodeId], graph, nodesList);
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
    };
    InterpretManager.findInitialNode = function (nodesList) {
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
    };
    InterpretManager.getOutboundLinks = function (graph, nodeId) {
        var e = graph.getCell(nodeId);
        var outboundLinks = graph.getConnectedLinks(e, { outbound: true });
        return outboundLinks;
    };
    InterpretManager.getIdByNode = function (node, nodesList) {
        for (var property in nodesList) {
            if (nodesList.hasOwnProperty(property)) {
                if (nodesList[property] === node)
                    return property;
            }
        }
    };
    return InterpretManager;
})();
//# sourceMappingURL=InterpretManager.js.map