import mAction = module("designer/logic/Action");

export class TransitionAction extends mAction.Action {
    private formId: string;

    constructor(formId: string) {
        super();
        this.formId = formId;
    }

    get FormId() {
        return this.formId;
    }
    set FormId(formId: string) {
        this.formId = formId;
    }
    public toXML() {
        var xml = "<transition form-id='" + this.formId + "' />\n";
        return xml;
    }
}