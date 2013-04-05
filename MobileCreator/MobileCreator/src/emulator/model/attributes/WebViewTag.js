var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mControlTag = require("./emulator/model/attributes/ControlTag")
var WebViewTag = (function (_super) {
    __extends(WebViewTag, _super);
    function WebViewTag() {
        _super.call(this);
    }
    Object.defineProperty(WebViewTag.prototype, "Url", {
        get: function () {
            return this.url;
        },
        set: function (value) {
            this.url = value;
        },
        enumerable: true,
        configurable: true
    });
    return WebViewTag;
})(mControlTag.ControlTag);
exports.WebViewTag = WebViewTag;
//@ sourceMappingURL=WebViewTag.js.map
