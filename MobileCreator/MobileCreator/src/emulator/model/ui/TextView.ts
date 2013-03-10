import mControl = module("emulator/model/ui/Control");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");

export class TextView extends mControl.Control {

    constructor(tag: mTextViewTag.TextViewTag);
    constructor(tag: mTextViewTag.TextViewTag, $control: JQuery);
    constructor(tag: mTextViewTag.TextViewTag, $control?: JQuery = $("<label></label>")) {
        super(tag, $control);
        $control.text(tag.Text);
        if (tag.TextSize > 0) {
            $control.css('font-size', tag.TextSize);
        }
        this.setDimensions();
    }

    public create() {
        super.create();
    }
}