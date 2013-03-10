var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/ControlTag"], function(require, exports, __mControlTag__) {
    var mControlTag = __mControlTag__;

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
})
