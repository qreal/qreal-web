import control = module("emulator/model/ui/Control");

export class ControlPanel extends control.Control {
    public childrens: control.Control[];

    constructor(id: string) {
        super(id);
        this.childrens = new Array();
    }

    public addChild(child: control.Control) {
        this.childrens.push(child);
    }

    public getChildrens() {
        return this.childrens;
    }
}