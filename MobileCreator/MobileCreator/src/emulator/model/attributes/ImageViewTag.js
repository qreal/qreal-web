var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mControlTag = require("./emulator/model/attributes/ControlTag")
var ImageViewTag = (function (_super) {
    __extends(ImageViewTag, _super);
    function ImageViewTag() {
        _super.call(this);
    }
    Object.defineProperty(ImageViewTag.prototype, "ImageUrl", {
        get: function () {
            return this.url;
        },
        set: function (value) {
            this.url = value;
        },
        enumerable: true,
        configurable: true
    });
    return ImageViewTag;
})(mControlTag.ControlTag);
exports.ImageViewTag = ImageViewTag;
//@ sourceMappingURL=ImageViewTag.js.map
