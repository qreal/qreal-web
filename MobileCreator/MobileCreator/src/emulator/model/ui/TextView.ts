import mControl = module("emulator/model/ui/Control");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");

export class TextView extends mControl.Control {

    constructor(tag: mTextViewTag.TextViewTag);
    constructor(tag: mTextViewTag.TextViewTag, $control: JQuery);
    constructor(tag: mTextViewTag.TextViewTag, $control?: JQuery = $("<label></label>")) {
        super(tag, $control);
        this.$Control.text(tag.Text);
    }

    public create() {      
    }
}