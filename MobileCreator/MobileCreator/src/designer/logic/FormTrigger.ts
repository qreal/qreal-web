import mAction = module("designer/logic/Action")

export class FormTrigger {
    private formId: string;
    private triggerName: string;
    private actions: mAction.Action[];
    constructor(formId: string, triggerName: string) {
        this.actions = [];
        this.formId = formId;
        this.triggerName = triggerName;
    }
    get FormId() {
        return this.formId;
    }
    set FormId(formId: string) {
        this.formId = formId;
    }
    get TriggerName() {
        return this.triggerName;
    }
    set TriggerName(triggerName: string) {
        this.triggerName = triggerName;
    }
    get Actions() {
        return this.actions;
    }
    set Actions(actions: mAction.Action[]) {
        this.actions = actions;
    }
    public addAction(action: mAction.Action) {
        this.actions.push(action);
    }
    public toXML() {
        var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
        var seqCount = 0;
        for (var i = 0; i < this.actions.length - 1; i++) {
            if (this.actions.length - 1 == 1) {
                xml += this.actions[i].toXML();
                break;
            }
            if (this.actions.length - i - 2 == 1) {
                xml += "<seq>\n";
                xml += "<first-operator>\n";
                xml += this.actions[i].toXML();
                xml += "</first-operator>\n";
                xml += "<second-operator>\n";
                xml += this.actions[i + 1].toXML();
                xml += "</second-operator>\n";
                xml += "</seq>\n";
                break;
            }
            else {
                xml += "<seq>\n";
                xml += "<first-operator>\n";
                xml += this.actions[i].toXML();
                xml += "</first-operator>\n";
                xml += "<second-operator>\n";
                seqCount++;
            }
        }
        for (var i = 0; i < seqCount; i++) {
            xml += "</second-operator>\n";
            xml += "</seq>\n";
        }
        xml += "</trigger>\n"
        return xml;
    }
}