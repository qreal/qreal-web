/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action")

export class FormTrigger {
    private formId: string;
    private triggerName: string;
    private actions: mAction.Action[];
    constructor(formId: string, triggerName: string) {
        this.actions = [];
        this.actions.push(new mAction.Action());
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
    public show(domElement: JQuery) {
        domElement.empty();
        for (var i = 0; i < this.actions.length; i++) {
            this.actions[i].show();
            if (i != (this.actions.length - 1)) {
                var removeButton = $("<a href='#' data-role='button' data-inline='true' data-icon='delete' data-iconpos='notext' data-theme='e' data-mini='true'>Delete</a>");
                domElement.append(removeButton);
                removeButton.button();
            }
        }
        var selectAction = $("<select name='selectNewAction' id='selectNewAction' data-inline='true' data-mini='true'></select>");
        var loginAction = $("<option value='login'>login</option>");
        var ifAction = $("<option value='if'>if</option>");
        var patientsAction = $("<option value='patients'>patientsRequest</option>");
        var saveSessionAction = $("<option value='saveSession'>saveSession</option>");
        var showMapAction = $("<option value='showMap'>showMap</option>");
        var transitionAction = $("<option value='transition'>transition</option>");
        selectAction.append(loginAction);
        selectAction.append(ifAction);
        selectAction.append(patientsAction);
        selectAction.append(saveSessionAction);
        selectAction.append(showMapAction);
        selectAction.append(transitionAction);
        domElement.append(selectAction);
        selectAction.selectmenu();
    }
    public toXML() {
        var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
        var seqCount = 0;
        for (var i = 0; i < this.actions.length - 1; i++) {
            if (this.actions.length == 1) {
                xml += this.actions[i].toXML();
                break;
            }
            if (this.actions.length - i - 1 == 1) {
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