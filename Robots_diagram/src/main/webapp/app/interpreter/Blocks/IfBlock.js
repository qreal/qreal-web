var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IfBlock = (function (_super) {
    __extends(IfBlock, _super);
    function IfBlock() {
        _super.apply(this, arguments);
    }
    IfBlock.run = function (node, graph, nodesList) {
        var output = "If: " + node.getName() + "\n";
        var condition = "";
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Condition") {
                condition = properties[p].value;
            }
        }
        output += "Condition: " + condition + "\n";
        if (links.length == 2) {
        }
        else {
        }
        return output;
    };
    return IfBlock;
})(Block);
//# sourceMappingURL=IfBlock.js.map