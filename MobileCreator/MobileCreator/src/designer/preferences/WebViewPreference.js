var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/preferences/ElementPreferences"], function(require, exports, __mElementPreferences__) {
    var mElementPreferences = __mElementPreferences__;

    var WebViewPreferences = (function (_super) {
        __extends(WebViewPreferences, _super);
        function WebViewPreferences() {
            _super.apply(this, arguments);

        }
        Object.defineProperty(WebViewPreferences.prototype, "Url", {
            get: function () {
                return this.url;
            },
            set: function (url) {
                this.url = url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebViewPreferences.prototype, "WebViewId", {
            get: function () {
                return this.webViewId;
            },
            set: function (webViewId) {
                this.webViewId = webViewId;
            },
            enumerable: true,
            configurable: true
        });
        return WebViewPreferences;
    })(mElementPreferences.ElementPreferences);
    exports.WebViewPreferences = WebViewPreferences;    
})
//@ sourceMappingURL=WebViewPreference.js.map
