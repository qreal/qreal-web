/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mElement = module("designer/widgets/Element");
import mElementPreferences = module("designer/preferences/ElementPreferences")
import mWebViewPreferences = module("designer/preferences/WebViewPreference")

export class WebView extends mElement.Element {
    private preferences: mWebViewPreferences.WebViewPreferences;
    private iframeMouseOver;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mWebViewPreferences.WebViewPreferences) {
        this.preferences = preferences;
    }
    constructor(preferences: mWebViewPreferences.WebViewPreferences);
    constructor(preferences: mWebViewPreferences.WebViewPreferences, domElement: JQuery);
    constructor(preferences: mWebViewPreferences.WebViewPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
    }
    public init() {
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
    }

    private fillPropertiesEditor(editorLayer: JQuery) {
        var _this = this;
        editorLayer.empty();
        var idLabel = $("<label for='text-id' > Id: </label>");
        var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.WebViewId + "' >");
        editorLayer.append(idLabel);
        editorLayer.append(idField);
        idField.change(function () {
            _this.preferences.WebViewId = idField.val();
        });
        idField.textinput();
        var textLabel = $("<label for='text-url' > Url: </label>");
        var textField = $("<input type = 'text' name = 'text-url' id = 'text-url' value = '" + this.Preferences.Url + "' >");
        editorLayer.append(textLabel);
        editorLayer.append(textField);
        textField.change(function () {
            var newValue: string = textField.val();
            //Dirty hack to deal with GoogleMaps server settings
            /*
            if (newValue.search("maps.google.") != -1) {
                newValue += "&amp;output=embed";
            }
            */
            _this.preferences.Url = newValue;
            _this.init();
        });
        textField.textinput();
    }

    public toXML() {
        var xmlString = "";
        xmlString += "<WebView \n";
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
        xmlString += "id=\"" + this.preferences.WebViewId + "\" ";
        xmlString += "url=\"" + this.preferences.Url + "\" />\n";
        return xmlString;
    }
}