var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control", "emulator/model/attributes/ControlTag"], function(require, exports, __mControl__, __mControlTag__) {
    var mControl = __mControl__;

    
    var mControlTag = __mControlTag__;

    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<div></div>"); }
                _super.call(this, tag, $control);
        }
        Button.prototype.create = function () {
            var $button = $("<a data-role='button'></a>");
            this.$Control.append($button);
            var tag = this.Tag;
            if(tag.TextSize != 0) {
                $button.css('font-size', tag.TextSize);
            }
            $button.text(tag.Text);
            if(tag.Width == mControlTag.ControlTag.WrapContent) {
                $button.attr('data-inline', 'true');
            }
            this.$Control.trigger('create');
            _super.prototype.create.call(this);
        };
        return Button;
    })(mControl.Control);
    exports.Button = Button;    
})
