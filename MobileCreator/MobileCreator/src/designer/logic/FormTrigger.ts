/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action")
import mSaveSessionAction = module("designer/logic/SaveSessionAction")
import mTransitionAction = module("designer/logic/TransitionAction")
import mShowMapAction = module("designer/logic/ShowMapAction")
import mPatientsRequestAction = module("designer/logic/PatientsRequestAction")
import mLoginRequestAction = module("designer/logic/LoginRequestAction")
import mCodeBlock = module("designer/logic/CodeBlock")

export class FormTrigger {
    private formId: string;
    private triggerName: string;
    private codeBlock: mCodeBlock.CodeBlock;
    constructor(formId: string, triggerName: string) {
        this.codeBlock = new mCodeBlock.CodeBlock(5);
        //this.actions.push(new mAction.Action());
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
    public show(domElement: JQuery) {
        this.codeBlock.show(domElement);
    }
    public toXML() {
        var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
        xml += this.codeBlock.toXML();
        xml += "</trigger>\n"
        return xml;
    }
}