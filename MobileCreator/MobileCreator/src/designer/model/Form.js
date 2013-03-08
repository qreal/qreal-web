define(["require", "exports"], function(require, exports) {
    
    var Form = (function () {
        function Form(id, name) {
            this.id = id;
            this.formName = name;
        }
        Object.defineProperty(Form.prototype, "Id", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "FormName", {
            get: function () {
                return this.formName;
            },
            set: function (name) {
                this.formName = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "BaseLayout", {
            get: function () {
                return this.baseLayout;
            },
            set: function (baseLayout) {
                this.baseLayout = baseLayout;
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.toXML = function () {
            return "STUB!!!";
        };
        return Form;
    })();
    exports.Form = Form;    
})
