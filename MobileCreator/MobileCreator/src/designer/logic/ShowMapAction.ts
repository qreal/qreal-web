import mAction = module("designer/logic/Action");

export class ShowMapAction extends mAction.Action {
    private controlId: string;

    constructor(controlId: string) {
        super();
        this.controlId = controlId;
    }

    get ControlId() {
        return this.controlId;
    }
    set ControlId(controlId: string) {
        this.controlId = controlId;
    }
    public toXML() {
        var xml = "<showmap id='" + this.controlId + "' />\n";
        return xml;
    }
}