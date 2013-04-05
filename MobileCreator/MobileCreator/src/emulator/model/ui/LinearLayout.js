var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};


var mControlPanel = require("./emulator/model/ui/ControlPanel")

var LinearLayout = (function (_super) {
    __extends(LinearLayout, _super);
    function LinearLayout(tag, $control) {
        if (typeof $control === "undefined") { $control = $("<div></div>"); }
        _super.call(this, tag, $control);
        this.setDimensions();
    }
    LinearLayout.prototype.addChild = function (child) {
        _super.prototype.addChild.call(this, child);
        this.$Control.append(child.$Control);
    };
    return LinearLayout;
})(mControlPanel.ControlPanel);
exports.LinearLayout = LinearLayout;
//@ sourceMappingURL=LinearLayout.js.map
