var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/widgets/Element", "designer/preferences/ElementPreferences", "designer/logic/CodeBlock"], function(require, exports, __mElement__, __mElementPreferences__, __mCodeBlock__) {
    var mElement = __mElement__;

    var mElementPreferences = __mElementPreferences__;

    
    
    var mCodeBlock = __mCodeBlock__;

    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(preferences, domElement) {
            if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
                _super.call(this, domElement);
            this.Preferences = preferences;
            this.codeBlock = new mCodeBlock.CodeBlock(10);
            this.init();
        }
        Object.defineProperty(Button.prototype, "Preferences", {
            get: function () {
                return this.preferences;
            },
            set: function (preferences) {
                this.preferences = preferences;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.init = function () {
            this.DomElement.empty();
            this.applyHeight();
            this.applyWidth();
            var button = $("<a data-role='button'></a>");
            this.DomElement.append(button);
            button.text(this.preferences.Text);
            button.css("font-size", this.preferences.TextSize + "px");
            button.css("margin-top", this.preferences.LayoutMarginTop + "px");
            var _this = this;
            this.DomElement.click(function () {
                _this.fillPropertiesEditor($("#propertiesEditor"));
            });
            this.DomElement.trigger('create');
        };
        Button.prototype.fillPropertiesEditor = function (editorLayer) {
            var _this = this;
            editorLayer.empty();
            var idLabel = $("<label for='text-id' > Id: </label>");
            var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.ButtonId + "' >");
            editorLayer.append(idLabel);
            editorLayer.append(idField);
            idField.change(function () {
                _this.preferences.ButtonId = idField.val();
            });
            idField.textinput();
            var textLabel = $("<label for='text-text' > Text: </label>");
            var textField = $("<input type = 'text' name = 'text-text' id = 'text-text' value = '" + this.Preferences.Text + "' >");
            editorLayer.append(textLabel);
            editorLayer.append(textField);
            textField.change(function () {
                _this.preferences.Text = textField.val();
                _this.init();
            });
            textField.textinput();
            var marginTopLabel = $("<label for='text-margin-top' > Top margin: </label>");
            var marginTopField = $("<input type = 'number' name = 'text-margin-top' id = 'text-margin-top' value = '" + this.Preferences.LayoutMarginTop + "' >");
            editorLayer.append(marginTopLabel);
            editorLayer.append(marginTopField);
            marginTopField.change(function () {
                _this.preferences.LayoutMarginTop = marginTopField.val();
                _this.init();
            });
            marginTopField.textinput();
            var onClickDiv = $("<div></div>");
            editorLayer.append(onClickDiv);
            this.codeBlock.show(onClickDiv);
        };
        Button.prototype.toXML = function () {
            var xmlString = "";
            xmlString += "<Button \n";
            if(this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
                xmlString += "layout_width=\"fill_parent\" ";
            } else if(this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
                xmlString += "layout_width=\"wrap_content\" ";
            } else {
                xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
            }
            if(this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
                xmlString += "layout_height=\"fill_parent\" ";
            } else if(this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
                xmlString += "layout_height=\"wrap_content\" ";
            } else {
                xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
            }
            xmlString += "layout_marginTop=\"" + this.preferences.LayoutMarginTop + "px\" ";
            xmlString += "text=\"" + this.preferences.Text + "\" ";
            xmlString += "textSize=\"" + this.preferences.TextSize + "px\" ";
            xmlString += "id=\"" + this.preferences.ButtonId + "\" ";
            return xmlString;
        };
        return Button;
    })(mElement.Element);
    exports.Button = Button;    
})
//@ sourceMappingURL=Button.js.map
