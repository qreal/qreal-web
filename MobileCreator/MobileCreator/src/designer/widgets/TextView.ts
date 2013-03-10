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
        this.DomElement.append(text);
        this.applyHeight();
        this.applyWidth();
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