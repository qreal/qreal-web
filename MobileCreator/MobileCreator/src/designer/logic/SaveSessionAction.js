var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var SaveSessionAction = (function (_super) {
        __extends(SaveSessionAction, _super);
        function SaveSessionAction() {
                _super.call(this);
        }
        SaveSessionAction.prototype.toXML = function () {
            var xml = "<save-session />\n";
            return xml;
        };
        return SaveSessionAction;
    })(mAction.Action);
    exports.SaveSessionAction = SaveSessionAction;    
})
