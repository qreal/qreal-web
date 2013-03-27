/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action")
import mSaveSessionAction = module("designer/logic/SaveSessionAction")
import mTransitionAction = module("designer/logic/TransitionAction")
import mShowMapAction = module("designer/logic/ShowMapAction")
import mPatientsRequestAction = module("designer/logic/PatientsRequestAction")
import mLoginRequestAction = module("designer/logic/LoginRequestAction")

export class FormTrigger {
    private formId: string;
    private triggerName: string;
    private actions: mAction.Action[];
    constructor(formId: string, triggerName: string) {
        this.actions = [];
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
    get Actions() {
        return this.actions;
    }
    set Actions(actions: mAction.Action[]) {
        this.actions = actions;
    }
    public addAction(action: mAction.Action) {
        this.actions.push(action);
    }
    private setRemoveHandler(element: JQuery, i, domElement: JQuery) {
        var _this = this;
        element.click(function () {
            _this.actions.splice(i, 1);
            _this.show(domElement);
        });
    }
    public show(domElement: JQuery) {
        var _this = this;
        domElement.empty();
        for (var i = 0; i < this.actions.length; i++) {
            var containDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            var action = this.actions[i];
            var actionIndex = i;
            domElement.append(containDiv);
            action.show(containDiv);
            var removeButton = $("<a href='#' data-role='button' data-icon='delete' data-inline='true' data-iconpos='notext' data-theme='e' data-mini='true'>Delete</a>");
            containDiv.append(removeButton);
            removeButton.button();
            domElement.trigger("create");
            this.setRemoveHandler(removeButton, i, domElement);
        }
        var newActionDiv = $("<div class='ui-grid-a'></div>");
        var selectActionDiv = $("<div class='ui-block-a'></div>");
        var buttonAddActionDiv = $("<div class='ui-block-b'></div>");
        var selectAction = $("<select name='selectNewAction' id='selectNewAction' data-mini='true'></select>");
        var loginAction = $("<option value='login'>login</option>");
        var ifAction = $("<option value='if'>if</option>");
        var patientsAction = $("<option value='patients'>getPatients</option>");
        var saveSessionAction = $("<option value='saveSession'>saveSession</option>");
        var showMapAction = $("<option value='showMap'>showMap</option>");
        var transitionAction = $("<option value='transition'>transition</option>");
        selectAction.append(loginAction);
        selectAction.append(ifAction);
        selectAction.append(patientsAction);
        selectAction.append(saveSessionAction);
        selectAction.append(showMapAction);
        selectAction.append(transitionAction);
        domElement.append(newActionDiv);
        newActionDiv.append(selectActionDiv);
        selectActionDiv.append(selectAction);
        selectAction.selectmenu();
        var addActionButton = $("<a href='#' data-role='button' data-icon='plus' data-iconpos='notext' data-theme='e' data-mini='true'>Add action</a>");
        domElement.append(addActionButton);
        newActionDiv.append(buttonAddActionDiv);
        buttonAddActionDiv.append(addActionButton);
        addActionButton.button();
        addActionButton.click(function () {
            switch (selectAction.val()) {
                case "saveSession":
                    _this.addAction(new mSaveSessionAction.SaveSessionAction());
                    _this.show(domElement);
                    break;
                case "transition":
                    _this.addAction(new mTransitionAction.TransitionAction("main"));
                    _this.show(domElement);
                    break;
                case "showMap":
                    _this.addAction(new mShowMapAction.ShowMapAction(""));
                    _this.show(domElement);
                    break;
                case "patients":
                    _this.addAction(new mPatientsRequestAction.PatientsRequestAction("someURL"));
                    _this.show(domElement);
                    break;
                case "login":
                    _this.addAction(new mLoginRequestAction.LoginRequestAction("someURL"));
                    _this.show(domElement);
                    break;
            }
        });
    }
    public toXML() {
        var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
        var seqCount = 0;
        for (var i = 0; i < this.actions.length; i++) {
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