import mLog = module("utils/log/Log");
import mEmulator = module("emulator/model/Emulator");
import mEventManager = module("emulator/model/managers/EventManager");
import mControl = module("emulator/model/ui/Control");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Button extends mControl.Control {
    private static logger = new mLog.Logger("Button");

    constructor(tag: mButtonTag.ButtonTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);

        var $button = $("<a data-role='button'></a>");
        this.$Control.append($button);
        var tag = <mButtonTag.ButtonTag> this.Tag;
        if (tag.TextSize != 0) {
            //this.$Control.children('a').children('span').children('span').css('font-size', tag.TextSize);
            $button.css('font-size', tag.TextSize);
        }
        $button.text(tag.Text);
        if (tag.Width == mControlTag.ControlTag.WrapContent) {
            $button.attr('data-inline', 'true');
        }
        var _this = this;
        $button.bind('click', function () {
            _this.onClick(_this);
        });
    }

    private onClick(button: Button): void {
        Button.logger.log("onClick");
        mEmulator.Emulator.instance.EventManager.trigger(this.Tag.Id, mEventManager.EventManager.OnAction);
    }
}