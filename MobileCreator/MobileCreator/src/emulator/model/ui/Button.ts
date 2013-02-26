import control = module("emulator/model/ui/Control");

export class Button extends control.Control {

    constructor(id: string) {
        super(id);
    }

    public getElement() {
        this.element = $("<a id='" + this.id + "'>Button</a>");
        return this.element;
    }

    public create() {
        this.element.button();
    }
}