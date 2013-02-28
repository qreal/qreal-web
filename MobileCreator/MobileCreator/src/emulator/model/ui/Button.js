var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/TextView"], function(require, exports, __mTextView__) {
    var mTextView = __mTextView__;

    
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<a></a>"); }
                _super.call(this, tag, $control);
        }
        Button.prototype.create = function () {
            this.$Control.button();
        };
        return Button;
    })(mTextView.TextView);
    exports.Button = Button;    
})
