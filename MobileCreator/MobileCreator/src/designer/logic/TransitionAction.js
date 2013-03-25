var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var TransitionAction = (function (_super) {
        __extends(TransitionAction, _super);
        function TransitionAction(formId) {
                _super.call(this);
            this.formId = formId;
        }
        Object.defineProperty(TransitionAction.prototype, "FormId", {
            get: function () {
                return this.formId;
            },
            set: function (formId) {
                this.formId = formId;
            },
            enumerable: true,
            configurable: true
        });
        TransitionAction.prototype.toXML = function () {
            var xml = "<transition form-id='" + this.formId + "' />\n";
            return xml;
        };
        return TransitionAction;
    })(mAction.Action);
    exports.TransitionAction = TransitionAction;    
})
