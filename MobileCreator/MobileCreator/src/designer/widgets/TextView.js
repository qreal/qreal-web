var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mElement = require("./designer/widgets/Element")
var mElementPreferences = require("./designer/preferences/ElementPreferences")

var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView(preferences, domElement) {
        if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
        _super.call(this, domElement);
        this.Preferences = preferences;
        this.init();
    }
    Object.defineProperty(TextView.prototype, "Preferences", {
        get: function () {
            return this.preferences;
        },
        set: function (preferences) {
            this.preferences = preferences;
        },
        enumerable: true,
        configurable: true
    });
    TextView.prototype.init = function () {
        this.DomElement.empty();
        var text = $("<label></label>");
        text.text(this.preferences.Text);
        this.DomElement.css("font-size", this.preferences.TextSize + "px");
        this.DomElement.css("margin-top", this.preferences.LayoutMarginTop + "px");
        this.DomElement.css("padding", this.preferences.Padding + "px");
        this.DomElement.css("text-align", "center");
        this.DomElement.append(text);
        this.applyHeight();
        this.applyWidth();
        this.DomElement.css("width", "auto");
        var _this = this;
        this.DomElement.click(function () {
            _this.fillPropertiesEditor($("#propertiesEditor"));
        });
    };
    TextView.prototype.fillPropertiesEditor = function (editorLayer) {
        editorLayer.empty();
        var _this = this;
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
        var sizeLabel = $("<label for='text-size' > Font size: </label>");
        var sizeField = $("<input type = 'number' name = 'text-size' id = 'text-size' value = '" + this.Preferences.TextSize + "' >");
        editorLayer.append(sizeLabel);
        editorLayer.append(sizeField);
        sizeField.change(function () {
            _this.preferences.TextSize = sizeField.val();
            _this.init();
        });
        sizeField.textinput();
    };
    TextView.prototype.toXML = function () {
        var xmlString = "";
        xmlString += "<TextView \n";
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
        xmlString += "padding=\"" + this.preferences.Padding + "px\" ";
        xmlString += "text=\"" + this.preferences.Text + "\" ";
        xmlString += "textSize=\"" + this.preferences.TextSize + "px\" />\n";
        return xmlString;
    };
    return TextView;
})(mElement.Element);
exports.TextView = TextView;
//@ sourceMappingURL=TextView.js.map
