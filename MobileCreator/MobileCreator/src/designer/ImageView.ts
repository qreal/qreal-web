/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mElement = module("designer/Element");
import mElementPreferences = module("designer/ElementPreferences")
import mImageViewPreferences = module("designer/ImageViewPreferences")

export class ImageView extends mElement.Element {
    private preferences: mImageViewPreferences.ImageViewPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mImageViewPreferences.ImageViewPreferences) {
        this.preferences = preferences;
    }
    constructor(preferences: mImageViewPreferences.ImageViewPreferences);
    constructor(preferences: mImageViewPreferences.ImageViewPreferences, domElement: JQuery);
    constructor(preferences: mImageViewPreferences.ImageViewPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
    }
    public init() {
        this.DomElement.empty();
        var image = $("<img></img>");
        image.attr('src', this.preferences.ImageURL);
        this.DomElement.append(image);
        this.applyHeight();
        this.applyWidth();
    }
    public toXML() {
        var xmlString = "";
        xmlString += "<ImageView \n";
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
        xmlString += "src=\"" + this.preferences.Src + "\" ";
        xmlString += "layout_gravity=\"" + this.preferences.LayoutGravity + "\" ";
        xmlString += "layout_marginTop=\"" + this.preferences.LayoutMarginTop + "px\" />\n";
        return xmlString;
    }
}