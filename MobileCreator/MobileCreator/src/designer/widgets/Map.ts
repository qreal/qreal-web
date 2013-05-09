/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mElement = module("designer/widgets/Element");
import mElementPreferences = module("designer/preferences/ElementPreferences")
import mMapPreferences = module("designer/preferences/MapPreferences")
import mDesigner = module("designer/Designer")

export class Map extends mElement.Element {
    private preferences: mMapPreferences.MapPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mMapPreferences.MapPreferences) {
        this.preferences = preferences;
    }
    constructor(preferences: mMapPreferences.MapPreferences);
    constructor(preferences: mMapPreferences.MapPreferences, domElement: JQuery);
    constructor(preferences: mMapPreferences.MapPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
    }
    public init() {
        this.DomElement.empty();
        this.applyHeight();
        this.applyWidth();
        var mapDiv = $("<div></div>");
        mapDiv.css("width", "100%");
        mapDiv.css("height", "100%");
        mapDiv.css("background", "url('images/map.jpg')");
        this.DomElement.append(mapDiv);
        this.fillPropertiesEditor($("#propertiesEditor"));
    }

    private fillPropertiesEditor(editorLayer: JQuery) {
        var _this = this;
        editorLayer.empty();
        var idLabel = $("<label for='text-id' > Id: </label>");
        var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.MapId + "' >");
        editorLayer.append(idLabel);
        editorLayer.append(idField);
        idField.change(function () {
            _this.preferences.MapId = idField.val();
            mDesigner.Designer.instance.saveModel();
        });
        idField.textinput();
    }

    public toXML() {
        var xmlString = "";
        xmlString += "<Map \n";
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
        xmlString += "id=\"" + this.preferences.MapId + "\" />\n";
        return xmlString;
    }
}