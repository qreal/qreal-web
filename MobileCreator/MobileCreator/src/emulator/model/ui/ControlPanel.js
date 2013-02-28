var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control"], function(require, exports, __mControl__) {
    var mControl = __mControl__;

    
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel(tag, $control) {
                _super.call(this, tag, $control);
            this.childrens = new Array();
            this.$Control.css({
                background: tag.Background
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
})
