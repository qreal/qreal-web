import mControl = module("emulator/model/ui/Control");
import mControlPanelTag = module("emulator/model/attributes/ControlPanelTag");

export class ControlPanel extends mControl.Control {
    public childrens: mControl.Control[];

    constructor(tag: mControlPanelTag.ControlPanelTag) {
        super(tag);
        this.childrens = new Array();
    }

    public addChild(child: mControl.Control) {
        this.childrens.push(child);
    }

    public getChildrens() {
        return this.childrens;
    }
}