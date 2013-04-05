var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mElement = require("./designer/widgets/Element")
var mElementPreferences = require("./designer/preferences/ElementPreferences")

var Map = (function (_super) {
    __extends(Map, _super);
    function Map(preferences, domElement) {
        if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
        _super.call(this, domElement);
        this.Preferences = preferences;
        this.init();
    }
    Object.defineProperty(Map.prototype, "Preferences", {
        get: function () {
            return this.preferences;
        },
        set: function (preferences) {
            this.preferences = preferences;
        },
        enumerable: true,
        configurable: true
    });
    Map.prototype.init = function () {
        this.DomElement.empty();
        this.applyHeight();
        this.applyWidth();
        var mapDiv = $("<div></div>");
        mapDiv.css("width", "100%");
        mapDiv.css("height", "100%");
        mapDiv.css("background", "url('images/map.jpg')");
        this.DomElement.append(mapDiv);
        this.fillPropertiesEditor($("#propertiesEditor"));
    };
    Map.prototype.fillPropertiesEditor = function (editorLayer) {
        var _this = this;
        editorLayer.empty();
        var idLabel = $("<label for='text-id' > Id: </label>");
        var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.MapId + "' >");
        editorLayer.append(idLabel);
        editorLayer.append(idField);
        idField.change(function () {
            _this.preferences.MapId = idField.val();
        });
        idField.textinput();
    };
    Map.prototype.toXML = function () {
        var xmlString = "";
        xmlString += "<Map \n";
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
        xmlString += "id=\"" + this.preferences.MapId + "\" />\n";
        return xmlString;
    };
    return Map;
})(mElement.Element);
exports.Map = Map;
//@ sourceMappingURL=Map.js.map
