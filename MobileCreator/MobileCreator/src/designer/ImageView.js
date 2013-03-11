var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/Element", "designer/ElementPreferences"], function(require, exports, __mElement__, __mElementPreferences__) {
    var mElement = __mElement__;

    var mElementPreferences = __mElementPreferences__;

    
    var ImageView = (function (_super) {
        __extends(ImageView, _super);
        function ImageView(preferences, domElement) {
            if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
                _super.call(this, domElement);
            this.Preferences = preferences;
            this.init();
        }
        Object.defineProperty(ImageView.prototype, "Preferences", {
            get: function () {
                return this.preferences;
            },
            set: function (preferences) {
                this.preferences = preferences;
            },
            enumerable: true,
            configurable: true
        });
        ImageView.prototype.init = function () {
            this.DomElement.empty();
            var image = $("<img></img>");
            image.attr('src', this.preferences.ImageURL);
            this.DomElement.append(image);
            this.applyHeight();
            this.applyWidth();
        };
        ImageView.prototype.toXML = function () {
            var xmlString = "";
            xmlString += "<ImageView \n";
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
            xmlString += "src=\"" + this.preferences.Src + "\" ";
            xmlString += "layout_gravity=\"" + this.preferences.LayoutGravity + "\" ";
            xmlString += "layout_marginTop=\"" + this.preferences.LayoutMarginTop + "px\" />\n";
        };
        return ImageView;
    })(mElement.Element);
    exports.ImageView = ImageView;    
})
