var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mElementPreferences = require("./designer/preferences/ElementPreferences")
var TextViewPreferences = (function (_super) {
    __extends(TextViewPreferences, _super);
    function TextViewPreferences() {
        _super.apply(this, arguments);

    }
    Object.defineProperty(TextViewPreferences.prototype, "LayoutMarginTop", {
        get: function () {
            return this.layoutMarginTop;
        },
        set: function (layoutMarginTop) {
            this.layoutMarginTop = layoutMarginTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextViewPreferences.prototype, "Padding", {
        get: function () {
            return this.padding;
        },
        set: function (padding) {
            this.padding = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextViewPreferences.prototype, "Text", {
        get: function () {
            return this.text;
        },
        set: function (text) {
            this.text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextViewPreferences.prototype, "TextSize", {
        get: function () {
            return this.textSize;
        },
        set: function (textSize) {
            this.textSize = textSize;
        },
        enumerable: true,
        configurable: true
    });
    return TextViewPreferences;
})(mElementPreferences.ElementPreferences);
exports.TextViewPreferences = TextViewPreferences;
//@ sourceMappingURL=TextViewPreferences.js.map
