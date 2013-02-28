import mTextView = module("emulator/model/ui/TextView");
import mButtonTag = module("emulator/model/attributes/ButtonTag");

export class Button extends mTextView.TextView {

    constructor(tag: mButtonTag.ButtonTag, $control?: JQuery = $("<a></a>")) {
        super(tag, $control);
       
    }

    public create() {
        this.$Control.button();
    }
}