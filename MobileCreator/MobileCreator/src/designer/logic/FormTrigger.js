define(["require", "exports", "designer/logic/CodeBlock"], function(require, exports, __mCodeBlock__) {
    
    
    
    
    
    
    var mCodeBlock = __mCodeBlock__;

    var FormTrigger = (function () {
        function FormTrigger(formId, triggerName) {
            this.codeBlock = new mCodeBlock.CodeBlock(5);
            this.formId = formId;
            this.triggerName = triggerName;
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
        FormTrigger.prototype.show = function (domElement) {
            this.codeBlock.show(domElement);
        };
        FormTrigger.prototype.toXML = function () {
            var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
            xml += this.codeBlock.toXML();
            xml += "</trigger>\n";
            return xml;
        };
        return FormTrigger;
    })();
    exports.FormTrigger = FormTrigger;    
})
//@ sourceMappingURL=FormTrigger.js.map
