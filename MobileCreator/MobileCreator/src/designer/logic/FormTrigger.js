define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var FormTrigger = (function () {
        function FormTrigger(formId, triggerName) {
            this.formId = formId;
            this.triggerName = triggerName;
            this.action = new mAction.Action();
        }
        Object.defineProperty(FormTrigger.prototype, "FormId", {
            get: function () {
                return this.formId;
            },
            set: function (formId) {
                this.formId = formId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormTrigger.prototype, "TriggerName", {
            get: function () {
                return this.triggerName;
            },
            set: function (triggerName) {
                this.triggerName = triggerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormTrigger.prototype, "Action", {
            get: function () {
                return this.action;
            },
            set: function (action) {
                this.action = action;
            },
            enumerable: true,
            configurable: true
        });
        FormTrigger.prototype.toXML = function () {
            var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
            xml += this.action.toXML();
            xml += "</trigger>\n";
            return xml;
        };
        return FormTrigger;
    })();
    exports.FormTrigger = FormTrigger;    
})
