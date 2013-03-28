var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "utils/log/Log", "emulator/model/ui/Control", "emulator/model/attributes/ControlTag"], function(require, exports, __mLog__, __mControl__, __mControlTag__) {
    var mLog = __mLog__;

    
    var mControl = __mControl__;

    
    var mControlTag = __mControlTag__;

    var Input = (function (_super) {
        __extends(Input, _super);
        function Input(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<div></div>"); }
                _super.call(this, tag, $control);
            var $input = $("<input></input>");
            this.$Control.append($input);
            var tag = this.Tag;
            if(tag.TextSize != 0) {
                $input.css('font-size', tag.TextSize);
            }
            $input.text(tag.Text);
            if(tag.Width == mControlTag.ControlTag.WrapContent) {
                $input.attr('data-inline', 'true');
            }
        }
        Input.logger = new mLog.Logger("Button");
        return Input;
    })(mControl.Control);
    exports.Input = Input;    
})
