var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mControl = require("./emulator/model/ui/Control")


var ControlPanel = (function (_super) {
    __extends(ControlPanel, _super);
    function ControlPanel(tag, $control) {
        _super.call(this, tag, $control);
        this.childrens = new Array();
        this.$Control.css({
            background: tag.Background,
            'overflow': 'hidden'
        });
    }
    Object.defineProperty(ControlPanel.prototype, "Childrens", {
        get: function () {
            return this.childrens;
        },
        enumerable: true,
        configurable: true
    });
    ControlPanel.prototype.addChild = function (child) {
        this.childrens.push(child);
    };
    return ControlPanel;
})(mControl.Control);
exports.ControlPanel = ControlPanel;
//@ sourceMappingURL=ControlPanel.js.map
