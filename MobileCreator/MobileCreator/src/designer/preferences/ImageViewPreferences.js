var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mElementPreferences = require("./designer/preferences/ElementPreferences")
var ImageViewPreferences = (function (_super) {
    __extends(ImageViewPreferences, _super);
    function ImageViewPreferences() {
        _super.apply(this, arguments);

    }
    Object.defineProperty(ImageViewPreferences.prototype, "LayoutMarginTop", {
        get: function () {
            return this.layoutMarginTop;
        },
        set: function (layoutMarginTop) {
            this.layoutMarginTop = layoutMarginTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewPreferences.prototype, "LayoutGravity", {
        get: function () {
            return this.layoutGravity;
        },
        set: function (layoutGravity) {
            this.layoutGravity = layoutGravity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewPreferences.prototype, "Src", {
        get: function () {
            return this.src;
        },
        set: function (src) {
            this.src = src;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewPreferences.prototype, "ImageURL", {
        get: function () {
            return this.imageURL;
        },
        set: function (imageURL) {
            this.imageURL = imageURL;
        },
        enumerable: true,
        configurable: true
    });
    return ImageViewPreferences;
})(mElementPreferences.ElementPreferences);
exports.ImageViewPreferences = ImageViewPreferences;
//@ sourceMappingURL=ImageViewPreferences.js.map
