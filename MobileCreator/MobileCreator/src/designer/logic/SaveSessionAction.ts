import mAction = module("designer/logic/Action");

export class SaveSessionAction extends mAction.Action {
    constructor() {
        super();
    }
    public toXML() {
        var xml = "<save-session />\n";
        return xml;
    }
}