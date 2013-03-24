import mLog = module("utils/log/Log");
import mEmulator = module("emulator/model/Emulator");
import mControl = module("emulator/model/ui/Control");
import mInputTag = module("emulator/model/attributes/InputTag");
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Input extends mControl.Control {
    private static logger = new mLog.Logger("Button");

    constructor(tag: mInputTag.InputTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);

        var $input = $("<input></input>");
        this.$Control.append($input);
        var tag = <mButtonTag.ButtonTag> this.Tag;
        if (tag.TextSize != 0) {
            $input.css('font-size', tag.TextSize);
        }
        $input.text(tag.Text);
        if (tag.Width == mControlTag.ControlTag.WrapContent) {
            $input.attr('data-inline', 'true');
        }
    }

}