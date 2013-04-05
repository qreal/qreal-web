var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mAction = require("./designer/logic/Action")
var mActionTypes = require("./designer/logic/ActionTypes")
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
        var saveSessionBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>SaveSession</a>");
        domeElement.append(saveSessionBlock);
        saveSessionBlock.button();
    };
    return SaveSessionAction;
})(mAction.Action);
exports.SaveSessionAction = SaveSessionAction;
//@ sourceMappingURL=SaveSessionAction.js.map
