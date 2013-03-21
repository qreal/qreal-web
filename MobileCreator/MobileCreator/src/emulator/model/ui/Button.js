var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "utils/log/Log", "emulator/model/Emulator", "emulator/model/ui/Control", "emulator/model/attributes/ControlTag"], function(require, exports, __mLog__, __mEmulator__, __mControl__, __mControlTag__) {
    var mLog = __mLog__;

    var mEmulator = __mEmulator__;

    var mControl = __mControl__;

    
    var mControlTag = __mControlTag__;

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
            if(tag.OnClick) {
                $button.bind('click', function () {
                    Button.logger.log("onClick: " + tag.OnClick);
                    mEmulator.Emulator.instance.NavigationManager.showPage(tag.OnClick);
                });
            }
        }
        Button.logger = new mLog.Logger("Button");
        Button.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        return Button;
    })(mControl.Control);
    exports.Button = Button;    
})
