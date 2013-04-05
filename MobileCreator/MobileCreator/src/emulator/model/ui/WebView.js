var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mControl = require("./emulator/model/ui/Control")

var WebView = (function (_super) {
    __extends(WebView, _super);
    function WebView(tag, $control) {
        if (typeof $control === "undefined") { $control = $("<iframe></iframe>"); }
        _super.call(this, tag, $control);
        this.setDimensions($control);
        this.$Control.attr('src', (this.Tag).Url);
    }
    return WebView;
})(mControl.Control);
exports.WebView = WebView;
//@ sourceMappingURL=WebView.js.map
