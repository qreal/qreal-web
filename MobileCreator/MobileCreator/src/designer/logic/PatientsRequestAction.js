var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mAction = require("./designer/logic/Action")
var mActionTypes = require("./designer/logic/ActionTypes")
var PatientsRequestAction = (function (_super) {
    __extends(PatientsRequestAction, _super);
    function PatientsRequestAction(url) {
        _super.call(this);
        this.ActionType = mActionTypes.ActionTypes.PatientsRequest;
        this.url = url;
    }
    PatientsRequestAction.prototype.show = function (domeElement) {
        var _this = this;
        var getPatientsBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Get patients from server</a>");
        domeElement.append(getPatientsBlock);
        getPatientsBlock.button();
    };
    Object.defineProperty(PatientsRequestAction.prototype, "Url", {
        get: function () {
            return this.url;
        },
        set: function (url) {
            this.url = url;
        },
        enumerable: true,
        configurable: true
    });
    PatientsRequestAction.prototype.toXML = function () {
        var xml = "<patients-request url='" + this.url + "' />\n";
        return xml;
    };
    return PatientsRequestAction;
})(mAction.Action);
exports.PatientsRequestAction = PatientsRequestAction;
//@ sourceMappingURL=PatientsRequestAction.js.map
