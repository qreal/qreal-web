/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mElement = module("designer/widgets/Element");
import mElementPreferences = module("designer/preferences/ElementPreferences")
import mTextViewPreferences = module("designer/preferences/TextViewPreferences")

export class TextView extends mElement.Element {
    private preferences: mTextViewPreferences.TextViewPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mTextViewPreferences.TextViewPreferences) {
        this.preferences = preferences;
    }
    constructor(preferences: mTextViewPreferences.TextViewPreferences);
    constructor(preferences: mTextViewPreferences.TextViewPreferences, domElement: JQuery);
    constructor(preferences: mTextViewPreferences.TextViewPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
    }
    public init() {
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
    }

    private fillPropertiesEditor(editorLayer: JQuery) {
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
        var paddingLabel = $("<label for='text-padding' > Padding: </label>");
        var paddingField = $("<input type = 'number' name = 'text-padding' id = 'text-padding' value = '" + this.Preferences.Padding + "' >");
        editorLayer.append(paddingLabel);
        editorLayer.append(paddingField);
        paddingField.change(function () {
            _this.preferences.Padding = paddingField.val();
            _this.init();
        });
        paddingField.textinput();
    }

    public toXML() {
        var xmlString = "";
        xmlString += "<TextView \n";
        if (this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_width=\"fill_parent\" ";
        } else if (this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_width=\"wrap_content\" ";
        } else {
            xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
        }
        if (this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_height=\"fill_parent\" ";
        } else if (this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_height=\"wrap_content\" ";
        } else {
            xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
        }
        xmlString += "layout_marginTop=\"" + this.preferences.LayoutMarginTop + "px\" ";
        xmlString += "padding=\"" + this.preferences.Padding + "px\" ";
        xmlString += "text=\"" + this.preferences.Text + "\" ";
        xmlString += "textSize=\"" + this.preferences.TextSize + "px\" />\n";
        return xmlString;
    }
}