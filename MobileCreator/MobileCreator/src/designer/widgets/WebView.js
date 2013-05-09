var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/widgets/Element", "designer/preferences/ElementPreferences", "designer/Designer"], function(require, exports, __mElement__, __mElementPreferences__, __mDesigner__) {
    var mElement = __mElement__;

    var mElementPreferences = __mElementPreferences__;

    
    var mDesigner = __mDesigner__;

    var WebView = (function (_super) {
        __extends(WebView, _super);
        function WebView(preferences, domElement) {
            if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
                _super.call(this, domElement);
            this.Preferences = preferences;
            this.init();
        }
        Object.defineProperty(WebView.prototype, "Preferences", {
            get: function () {
                return this.preferences;
            },
            set: function (preferences) {
                this.preferences = preferences;
            },
            enumerable: true,
            configurable: true
        });
        WebView.prototype.init = function () {
            this.iframeMouseOver = false;
            this.DomElement.empty();
            this.applyHeight();
            this.applyWidth();
            var iframe = $("<iframe></iframe>");
            iframe.attr("z-index", "-10");
            iframe.attr("disabled", "disabled");
            iframe.attr("frameBorder", "0");
            iframe.css("width", "100%");
            iframe.css("height", "100%");
            iframe.attr("src", this.preferences.Url);
            this.DomElement.append(iframe);
            this.fillPropertiesEditor($("#propertiesEditor"));
        };
        WebView.prototype.fillPropertiesEditor = function (editorLayer) {
            var _this = this;
            editorLayer.empty();
            var idLabel = $("<label for='text-id' > Id: </label>");
            var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.WebViewId + "' >");
            editorLayer.append(idLabel);
            editorLayer.append(idField);
            idField.change(function () {
                _this.preferences.WebViewId = idField.val();
                mDesigner.Designer.instance.saveModel();
            });
            idField.textinput();
            var textLabel = $("<label for='text-url' > Url: </label>");
            var textField = $("<input type = 'text' name = 'text-url' id = 'text-url' value = '" + this.Preferences.Url + "' >");
            editorLayer.append(textLabel);
            editorLayer.append(textField);
            textField.change(function () {
                var newValue = textField.val();
                _this.preferences.Url = newValue;
                _this.init();
                mDesigner.Designer.instance.saveModel();
            });
            textField.textinput();
        };
        WebView.prototype.toXML = function () {
            var xmlString = "";
            xmlString += "<WebView \n";
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
            xmlString += "id=\"" + this.preferences.WebViewId + "\" ";
            xmlString += "url=\"" + this.preferences.Url + "\" />\n";
            return xmlString;
        };
        return WebView;
    })(mElement.Element);
    exports.WebView = WebView;    
})
//@ sourceMappingURL=WebView.js.map
