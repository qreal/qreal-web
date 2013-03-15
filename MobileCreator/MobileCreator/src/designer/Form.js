define(["require", "exports"], function(require, exports) {
    
    var Form = (function () {
        function Form(formName, domElement) {
            this.content = [];
            this.formName = formName;
            this.domElement = domElement;
            this.formDomElement = $("<div id=\"" + this.formName + "\"></div>");
            this.formDomElement.addClass("screen");
            this.domElement.append(this.formDomElement);
        }
        Object.defineProperty(Form.prototype, "FormName", {
            get: function () {
                return this.formName;
            },
            set: function (formName) {
                this.formName = formName;
                this.formDomElement.attr("id", this.formName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "Content", {
            get: function () {
                return this.content;
            },
            set: function (content) {
                this.content = content;
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.addElement = function (element) {
            this.content.push(element);
            this.formDomElement.append(element.DomElement);
        };
        Form.prototype.delElement = function (element) {
            var id = element.Preferences.Id;
            var positionToDel = -1;
            for(var i = 0; i < this.content.length; i++) {
                if(this.content[i].Preferences.Id == id) {
                    positionToDel = i;
                    break;
                }
            }
            if(positionToDel != -1) {
                this.content.splice(positionToDel, 1);
            }
        };
        Form.prototype.show = function () {
            this.formDomElement.show();
            for(var i = 0; i < this.content.length; i++) {
                this.content[i].init();
            }
        };
        Form.prototype.hide = function () {
            this.formDomElement.hide();
        };
        Form.prototype.toXML = function () {
            var xml = "<form form_name=\"" + this.formName + "\">\n";
            this.content.forEach(function (element) {
                xml += element.toXML();
            });
            xml += "</form>\n";
            return xml;
        };
        return Form;
    })();
    exports.Form = Form;    
})
