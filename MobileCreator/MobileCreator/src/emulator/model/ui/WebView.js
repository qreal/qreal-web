var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control"], function(require, exports, __mControl__) {
    var mControl = __mControl__;

    
    var WebView = (function (_super) {
        __extends(WebView, _super);
        function WebView(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<iframe></iframe>"); }
                _super.call(this, tag, $control);
            this.setDimensions($control);
            this.$Control.attr('src', (this.Tag).Url);
        }
        WebView.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        return WebView;
    })(mControl.Control);
    exports.WebView = WebView;    
})
