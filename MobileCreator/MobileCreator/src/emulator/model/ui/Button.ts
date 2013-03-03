import mTextView = module("emulator/model/ui/TextView");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Button extends mTextView.TextView {

    constructor(tag: mButtonTag.ButtonTag, $control?: JQuery = $("<button></button>")) {
        super(tag, $control);
        if (tag.Width == mControlTag.ControlTag.WrapContent) {
            this.$Control.attr("data-inline", true)
        }
    }

    public create() {
        var $newControl = this.$Control.button();
        this.$Control = $newControl.parent("div");
        this.setDimensions();
    }
}