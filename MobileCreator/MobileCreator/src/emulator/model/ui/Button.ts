import control = module("emulator/model/ui/Control");
import mButtonTag = module("emulator/model/attributes/ButtonTag");

export class Button extends control.Control {

    constructor(tag: mButtonTag.ButtonTag) {
        super(tag);
    }

    public getElement() {
        this.element = $("<a id='" + this.Tag.Id + "'>Button</a>");
        return this.element;
    }

    public create() {
        this.element.button();
    }
}