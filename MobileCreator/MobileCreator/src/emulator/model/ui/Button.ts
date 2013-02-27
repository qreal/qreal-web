import mTextView = module("emulator/model/ui/TextView");
import mButtonTag = module("emulator/model/attributes/ButtonTag");

export class Button extends mTextView.TextView {

    constructor(tag: mButtonTag.ButtonTag, elementJQuery?: JQuery = $("<a></a>")) {
        super(tag, elementJQuery);
       
    }

    public create() {
        this.ElementJQuery.button();        
    }
}