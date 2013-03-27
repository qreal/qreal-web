var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var PatientsRequestAction = (function (_super) {
        __extends(PatientsRequestAction, _super);
        function PatientsRequestAction(url) {
                _super.call(this);
            this.url = url;
        }
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
})
//@ sourceMappingURL=PatientsRequestAction.js.map
