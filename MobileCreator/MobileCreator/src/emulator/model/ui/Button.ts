import control = module("emulator/model/ui/Control");
import mButtonTag = module("emulator/model/attributes/ButtonTag");

export class Button extends control.Control {

    constructor(tag: mButtonTag.ButtonTag) {
        super(tag);
        this.ElementJQuery = $("<a id='" + this.Tag.Id + "'>Button</a>");
    }

    public create() {
        this.ElementJQuery.button();
    }
}