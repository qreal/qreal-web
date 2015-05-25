var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FunctionBlock = (function (_super) {
    __extends(FunctionBlock, _super);
    function FunctionBlock() {
        _super.apply(this, arguments);
    }
    FunctionBlock.run = function (node, graph) {
        var output = "Function: " + node.getName() + "\n";
        var properties = node.getProperties();
        var body = "";
        var initialization = true;
        for (var p in properties) {
            if (properties.hasOwnProperty(p)) {
                if (p == "Body") {
                    body = properties[p].value;
                }
                else if (p == "Initialization") {
                    initialization = properties[p].value;
                }
                else {
                    output += "Error, cannot get properties of " + node.getName() + "\n";
                }
            }
        }
        return output;
    };
    return FunctionBlock;
})(Block);
//# sourceMappingURL=FunctionBlock.js.map