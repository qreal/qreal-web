var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mLog = require("./utils/log/Log")
var mEmulator = require("./emulator/model/Emulator")
var mEventManager = require("./emulator/model/managers/EventManager")
var mControl = require("./emulator/model/ui/Control")

var mControlTag = require("./emulator/model/attributes/ControlTag")
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(tag, $control) {
        if (typeof $control === "undefined") { $control = $("<div></div>"); }
        _super.call(this, tag, $control);
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
        var _this = this;
        $button.bind('click', function () {
            _this.onClick(_this);
        });
    }
    Button.logger = new mLog.Logger("Button");
    Button.prototype.onClick = function (button) {
        Button.logger.log("onClick");
        mEmulator.Emulator.instance.EventManager.trigger(this.Tag.Id, mEventManager.EventManager.OnAction);
    };
    return Button;
})(mControl.Control);
exports.Button = Button;
//@ sourceMappingURL=Button.js.map
