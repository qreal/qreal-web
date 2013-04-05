var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/widgets/Element", "designer/preferences/ElementPreferences"], function(require, exports, __mElement__, __mElementPreferences__) {
    var mElement = __mElement__;

    var mElementPreferences = __mElementPreferences__;

    
    var EditText = (function (_super) {
        __extends(EditText, _super);
        function EditText(preferences, domElement) {
            if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
                _super.call(this, domElement);
            this.Preferences = preferences;
            this.init();
        }
        Object.defineProperty(EditText.prototype, "Preferences", {
            get: function () {
                return this.preferences;
            },
            set: function (preferences) {
                this.preferences = preferences;
            },
            enumerable: true,
            configurable: true
        });
        EditText.prototype.init = function () {
            this.DomElement.empty();
            var text = $("<input type = 'text' name = '" + this.Preferences.EditTextId + "' id = '" + this.Preferences.EditTextId + "' value = '" + this.Preferences.Text + "' >");
            text.text(this.preferences.Text);
            this.DomElement.css("font-size", this.preferences.TextSize + "px");
            this.DomElement.css("margin-top", this.preferences.LayoutMarginTop + "px");
            this.DomElement.css("padding", this.preferences.Padding + "px");
            this.DomElement.css("text-align", "center");
            this.DomElement.append(text);
            this.applyHeight();
            this.applyWidth();
            var _this = this;
            text.change(function () {
                _this.Preferences.Text = text.val();
            });
            this.DomElement.click(function () {
                _this.fillPropertiesEditor($("#propertiesEditor"));
            });
            text.textinput();
        };
        EditText.prototype.fillPropertiesEditor = function (editorLayer) {
            editorLayer.empty();
            var _this = this;
            var idLabel = $("<label for='text-id' > Id: </label>");
            var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.EditTextId + "' >");
            editorLayer.append(idLabel);
            editorLayer.append(idField);
            idField.change(function () {
                _this.preferences.EditTextId = idField.val();
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
        };
        EditText.prototype.toXML = function () {
            var xmlString = "";
            xmlString += "<EditText \n";
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
            xmlString += "id=\"" + this.preferences.EditTextId + "\" ";
            xmlString += "padding=\"" + this.preferences.Padding + "px\" ";
            xmlString += "text=\"" + this.preferences.Text + "px\" />\n";
            return xmlString;
        };
        return EditText;
    })(mElement.Element);
    exports.EditText = EditText;    
})
//@ sourceMappingURL=EditText.js.map
