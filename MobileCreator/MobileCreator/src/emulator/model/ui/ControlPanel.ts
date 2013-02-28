import mControl = module("emulator/model/ui/Control");
import mControlTag = module("emulator/model/attributes/ControlTag");
import mControlPanelTag = module("emulator/model/attributes/ControlPanelTag");


export class ControlPanel extends mControl.Control {

    private childrens: mControl.Control[];
    get Childrens() { return this.childrens; }

    constructor(tag: mControlPanelTag.ControlPanelTag, $control: JQuery) {
        super(tag, $control);
        this.childrens = new Array();
        this.$Control.css({
            background: tag.Background           
        });  
    }

    public addChild(child: mControl.Control) {
        this.childrens.push(child);
    }
}