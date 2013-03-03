var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/TextView", "emulator/model/attributes/ControlTag"], function(require, exports, __mTextView__, __mControlTag__) {
    var mTextView = __mTextView__;

    
    var mControlTag = __mControlTag__;

    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<button></button>"); }
                _super.call(this, tag, $control);
            if(tag.Width == mControlTag.ControlTag.WrapContent) {
                this.$Control.attr("data-inline", true);
            }
        }
        Button.prototype.create = function () {
            var $newControl = this.$Control.button();
            this.$Control = $newControl.parent("div");
            var tag = this.Tag;
            if(tag.TextSize != 0) {
                this.$Control.children('span').children('span').css('font-size', tag.TextSize);
            }
            _super.prototype.create.call(this);
        };
        return Button;
    })(mTextView.TextView);
    exports.Button = Button;    
})
