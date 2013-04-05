var mElementPreferences = require("./designer/preferences/ElementPreferences")
var Element = (function () {
    function Element(domElement) {
        this.domElement = domElement;
        this.domElement.css('margin: 0px');
    }
    Object.defineProperty(Element.prototype, "DomElement", {
        get: function () {
            return this.domElement;
        },
        set: function (domElement) {
            this.domElement = domElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "Preferences", {
        get: function () {
            return this.preferences;
        },
        set: function (preferences) {
            this.preferences = preferences;
        },
        enumerable: true,
        configurable: true
    });
    Element.prototype.applyWidth = function (dom) {
        if (typeof dom === "undefined") { dom = this.domElement; }
        if(this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            dom.css("width", "100%");
            return;
        }
        if(this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            return;
        }
        dom.css("width", this.preferences.Width + "px");
    };
    Element.prototype.applyHeight = function (dom) {
        if (typeof dom === "undefined") { dom = this.domElement; }
        if(this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            dom.css("height", "100%");
            return;
        }
        if(this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            return;
        }
        dom.css("height", this.preferences.Height + "px");
    };
    Element.prototype.toXML = function () {
    };
    Element.prototype.init = function () {
    };
    return Element;
})();
exports.Element = Element;
//@ sourceMappingURL=Element.js.map
