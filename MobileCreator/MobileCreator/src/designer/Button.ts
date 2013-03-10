/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mElement = module("designer/Element");
import mElementPreferences = module("designer/ElementPreferences")
import mButtonPreferences = module("designer/ButtonPreferences")

export class Button extends mElement.Element {
    private preferences: mButtonPreferences.ButtonPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mButtonPreferences.ButtonPreferences) {
        this.preferences = preferences;
    }
    constructor(preferences: mButtonPreferences.ButtonPreferences);
    constructor(preferences: mButtonPreferences.ButtonPreferences, domElement: JQuery);
    constructor(preferences: mButtonPreferences.ButtonPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
    }
    public init() {
        this.DomElement.empty();
        var button = $("<a data-role='button'></a>");
        button.text(this.preferences.Text);
        this.DomElement.append(button);
        this.DomElement.trigger('create');
        this.applyHeight();
        this.applyWidth();
    }
    public toXML() {
        var xmlString = "";
        xmlString += "<Button \n";
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
        xmlString += "text=\"" + this.preferences.Text + "\" ";
        xmlString += "textSize=\"" + this.preferences.TextSize + "px\" ";
        xmlString += "id=\"@+id/" + this.preferences.ButtonId + "\" ";
        xmlString += "onClick=\"" + this.preferences.OnClickHandler + "\" />\n";
    }
}