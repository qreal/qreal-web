var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var InitialBlock = (function (_super) {
    __extends(InitialBlock, _super);
    function InitialBlock() {
        _super.apply(this, arguments);
    }
    InitialBlock.run = function (node, graph, nodesList) {
        var output = "Initial: " + node.getName() + "\n";
        var nodeId = InterpretManager.getIdByNode(node, nodesList);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);
        if (links.length == 1) {
            var nextNode = nodesList[links[0].get('target').id];
            output += Factory.run(nextNode, graph, nodesList) + "\n";
        }
        else if (links.length > 1) {
            output += "Error: too many links\n";
        }
        return output;
    };
    return InitialBlock;
})(Block);
//# sourceMappingURL=initialBlock.js.map