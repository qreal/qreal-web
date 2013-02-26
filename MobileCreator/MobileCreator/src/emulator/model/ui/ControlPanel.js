var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control"], function(require, exports, __control__) {
    var control = __control__;

    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel(id) {
                _super.call(this, id);
            this.childrens = new Array();
        }
        ControlPanel.prototype.addChild = function (child) {
            this.childrens.push(child);
        };
        ControlPanel.prototype.getChildrens = function () {
            return this.childrens;
        };
        return ControlPanel;
    })(control.Control);
    exports.ControlPanel = ControlPanel;    
})
