import mControl = module("emulator/model/ui/Control");
import mControlPanelTag = module("emulator/model/attributes/ControlPanelTag");

export class ControlPanel extends mControl.Control {

    private childrens: mControl.Control[];
    get Childrens() { return this.childrens; }

    constructor(tag: mControlPanelTag.ControlPanelTag, elementJQuery: JQuery) {
        super(tag, elementJQuery);
        this.childrens = new Array();
        this.ElementJQuery.css("background", tag.Background);
    }

    public addChild(child: mControl.Control) {
        this.childrens.push(child);
    }
}