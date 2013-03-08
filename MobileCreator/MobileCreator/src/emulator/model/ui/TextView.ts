import mControl = module("emulator/model/ui/Control");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");

export class TextView extends mControl.Control {

    constructor(tag: mTextViewTag.TextViewTag);
    constructor(tag: mTextViewTag.TextViewTag, $control: JQuery);
    constructor(tag: mTextViewTag.TextViewTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
        var $label = $("<label></label>")
        $label.text(tag.Text);
        if (tag.TextSize > 0) {
            $label.css('font-size', tag.TextSize);
        }
        this.$Control.append($label);
    }

    public create() {
        super.create();
    }
}