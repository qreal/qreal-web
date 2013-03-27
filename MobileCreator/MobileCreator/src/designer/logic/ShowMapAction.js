var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var ShowMapAction = (function (_super) {
        __extends(ShowMapAction, _super);
        function ShowMapAction(controlId) {
                _super.call(this);
            this.controlId = controlId;
        }
        Object.defineProperty(ShowMapAction.prototype, "ControlId", {
            get: function () {
                return this.controlId;
            },
            set: function (controlId) {
                this.controlId = controlId;
            },
            enumerable: true,
            configurable: true
        });
        ShowMapAction.prototype.toXML = function () {
            var xml = "<showmap id='" + this.controlId + "' />\n";
            return xml;
        };
        return ShowMapAction;
    })(mAction.Action);
    exports.ShowMapAction = ShowMapAction;    
})
//@ sourceMappingURL=ShowMapAction.js.map
