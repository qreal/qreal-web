import mControl = module("emulator/model/ui/Control");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");

export class TextView extends mControl.Control {

    constructor(tag: mTextViewTag.TextViewTag);
    constructor(tag: mTextViewTag.TextViewTag, elementJQuery: JQuery);
    constructor(tag: mTextViewTag.TextViewTag, elementJQuery?: JQuery = $("<label></label>")) {
        super(tag, elementJQuery);
        this.ElementJQuery.text(tag.Text);        
    }

    public create() {      
    }
}