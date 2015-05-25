var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FinalBlock = (function (_super) {
    __extends(FinalBlock, _super);
    function FinalBlock() {
        _super.apply(this, arguments);
    }
    FinalBlock.run = function (node, graph) {
        var output = "Final" + "\n";
        return output;
    };
    return FinalBlock;
})(Block);
//# sourceMappingURL=FinalBlock.js.map