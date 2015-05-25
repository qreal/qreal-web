var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Motors = (function (_super) {
    __extends(Motors, _super);
    function Motors() {
        _super.apply(this, arguments);
    }
    Motors.run = function (node, graph, nodesList, forward) {
        var output = "Motors forward/backward: " + node.getName() + "\n";
        var ports = [];
        var power = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Ports") {
                ports += properties[p].value.split(", ");
            }
            if (p == "Power (%)") {
                power = parseInt(properties[p].value);
            }
        }
        output += "Ports: " + ports + "\n" + "Power: " + power + "\n";
        if (links.length == 1) {
            var nextNode = nodesList[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesList);
        }
        else if (links.length > 1) {
            output += "Error: too many links\n";
        }
        return output;
    };
    return Motors;
})(Block);
//# sourceMappingURL=Motors.js.map