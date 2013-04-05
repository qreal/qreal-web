var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mElementPreferences = require("./designer/preferences/ElementPreferences")
var EditTextPreferences = (function (_super) {
    __extends(EditTextPreferences, _super);
    function EditTextPreferences() {
        _super.apply(this, arguments);

    }
    Object.defineProperty(EditTextPreferences.prototype, "LayoutMarginTop", {
        get: function () {
            return this.layoutMarginTop;
        },
        set: function (layoutMarginTop) {
            this.layoutMarginTop = layoutMarginTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTextPreferences.prototype, "Padding", {
        get: function () {
            return this.padding;
        },
        set: function (padding) {
            this.padding = padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTextPreferences.prototype, "Text", {
        get: function () {
            return this.text;
        },
        set: function (text) {
            this.text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTextPreferences.prototype, "TextSize", {
        get: function () {
            return this.textSize;
        },
        set: function (textSize) {
            this.textSize = textSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTextPreferences.prototype, "EditTextId", {
        get: function () {
            return this.editTextId;
        },
        set: function (editTextId) {
            this.editTextId = editTextId;
        },
        enumerable: true,
        configurable: true
    });
    return EditTextPreferences;
})(mElementPreferences.ElementPreferences);
exports.EditTextPreferences = EditTextPreferences;
//@ sourceMappingURL=EditTextPreferences.js.map
