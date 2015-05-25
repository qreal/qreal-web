var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MotorsStop = (function (_super) {
    __extends(MotorsStop, _super);
    function MotorsStop() {
        _super.apply(this, arguments);
    }
    MotorsStop.run = function (node, graph, nodesList) {
        var output = "Motors stop: " + node.getName() + "\n";
        var ports = [];
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Ports") {
                ports += properties[p].value.split(",");
            }
        }
        output += "Ports: " + ports + "\n";
        if (links.length == 1) {
            var nextNode = nodesList[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesList);
        }
        else if (links.length > 1) {
            output += "Error: too many links\n";
        }
        return output;
    };
    return MotorsStop;
})(Block);
//# sourceMappingURL=MotorsStop.js.map