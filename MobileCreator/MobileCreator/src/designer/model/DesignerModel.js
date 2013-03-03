define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var DesignerModel = (function () {
        function DesignerModel() {
            this.logger = new mLog.Logger("Designer");
            this.forms = [];
        }
        DesignerModel.instance = new DesignerModel();
        Object.defineProperty(DesignerModel.prototype, "Forms", {
            get: function () {
                return this.forms;
            },
            enumerable: true,
            configurable: true
        });
        DesignerModel.prototype.addForm = function (form) {
            this.forms.push(form);
        };
        DesignerModel.prototype.deleteForm = function (formId) {
            var formToDel = -1;
            for(var i = 0; this.forms.length; i++) {
                if(formId == this.forms[i].Id) {
                    formToDel = i;
                }
            }
            this.forms.splice(formToDel, 1);
        };
        return DesignerModel;
    })();
    exports.DesignerModel = DesignerModel;    
})
