var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mLog = require("./utils/log/Log")

var mControl = require("./emulator/model/ui/Control")

var mControlTag = require("./emulator/model/attributes/ControlTag")
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
//@ sourceMappingURL=Input.js.map
