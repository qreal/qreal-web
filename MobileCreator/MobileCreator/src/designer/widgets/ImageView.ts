/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mElement = module("designer/widgets/Element");
import mElementPreferences = module("designer/preferences/ElementPreferences")
import mImageViewPreferences = module("designer/preferences/ImageViewPreferences")

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
        image.attr('src', this.preferences.Src);
        this.DomElement.css("text-align", "center");
        this.DomElement.css("margin-top", this.preferences.LayoutMarginTop + "px");
        this.DomElement.append(image);
        this.applyHeight();
        this.applyWidth();
        var _this = this;
        this.DomElement.click(function () {
            _this.fillPropertiesEditor($("#propertiesEditor"));
        });
    }
    private fillPropertiesEditor(editorLayer: JQuery) {
        editorLayer.empty();
        var _this = this;
        var srcLabel = $("<label for='text-src' > Source: </label>");
        var srcField = $("<input type = 'text' name = 'text-src' id = 'text-src' value = '" + this.Preferences.Src + "' >");
        editorLayer.append(srcLabel);
        editorLayer.append(srcField);
        srcField.change(function () {
            _this.preferences.Src = srcField.val();
            _this.init();
        });
        srcField.textinput();
        var marginTopLabel = $("<label for='text-margin-top' > Top margin: </label>");
        var marginTopField = $("<input type = 'number' name = 'text-margin-top' id = 'text-margin-top' value = '" + this.Preferences.LayoutMarginTop + "' >");
        editorLayer.append(marginTopLabel);
        editorLayer.append(marginTopField);
        marginTopField.change(function () {
            _this.preferences.LayoutMarginTop = marginTopField.val();
            _this.init();
        });
        marginTopField.textinput();
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