var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action", "designer/logic/ActionTypes"], function(require, exports, __mAction__, __mActionTypes__) {
    var mAction = __mAction__;

    var mActionTypes = __mActionTypes__;

    var SaveSessionAction = (function (_super) {
        __extends(SaveSessionAction, _super);
        function SaveSessionAction() {
            this.ActionType = mActionTypes.ActionTypes.SaveSession;
                _super.call(this);
        }
        SaveSessionAction.prototype.toXML = function () {
            var xml = "<save-session />\n";
            return xml;
        };
        SaveSessionAction.prototype.show = function (domeElement) {
            var saveSessionBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>SaveSession</a>");
            domeElement.append(saveSessionBlock);
            saveSessionBlock.button();
        };
        return SaveSessionAction;
    })(mAction.Action);
    exports.SaveSessionAction = SaveSessionAction;    
})
//@ sourceMappingURL=SaveSessionAction.js.map
