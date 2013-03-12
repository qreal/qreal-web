import mLog = module("utils/log/Log");
import mEmulator = module("emulator/model/Emulator");
import mControl = module("emulator/model/ui/Control");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Button extends mControl.Control {
    private static logger = new mLog.Logger("Button");

    constructor(tag: mButtonTag.ButtonTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
    }

    public create() {
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
        if (tag.OnClick) {
            $button.click(function () {
                Button.logger.log("onClick: " + tag.OnClick);
                mEmulator.Emulator.instance.showPage(tag.OnClick);
            });
        }
        this.$Control.trigger('create');
        super.create();
    }
}