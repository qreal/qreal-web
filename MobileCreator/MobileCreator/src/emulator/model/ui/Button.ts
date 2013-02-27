import control = module("emulator/model/ui/Control");
import mButtonTag = module("emulator/model/attributes/ButtonTag");

export class Button extends control.Control {

    constructor(tag: mButtonTag.ButtonTag) {
        super(tag);
        this.ElementJQuery = $("<a></a>");
        this.ElementJQuery.text(tag.Text);
        this.ElementJQuery.attr('id', tag.Id);
        //this.ElementJQuery.css('background', tag.Background);
    }

    public create() {
        this.ElementJQuery.button();        
    }
}