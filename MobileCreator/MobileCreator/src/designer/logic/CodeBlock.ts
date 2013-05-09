/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action")
import mSaveSessionAction = module("designer/logic/SaveSessionAction")
import mTransitionAction = module("designer/logic/TransitionAction")
import mShowMapAction = module("designer/logic/ShowMapAction")
import mPatientsRequestAction = module("designer/logic/PatientsRequestAction")
import mLoginRequestAction = module("designer/logic/LoginRequestAction")
import mIfAction = module("designer/logic/IfAction")
import mWidgetTypes = module("designer/widgets/WidgetTypes")
import mActionTypes = module("designer/logic/ActionTypes")
import mDesigner = module("designer/Designer")

export class CodeBlock {
    private marginLeft;
    private actions: mAction.Action[];
    constructor(marginLeft) {
        this.actions = [];
        this.marginLeft = marginLeft;
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
            mDesigner.Designer.instance.saveModel();
        });
    }
    public show(domElement: JQuery) {
        var _this = this;
        domElement.empty();
        for (var i = 0; i < this.actions.length; i++) {
            var action = this.actions[i];
            var actionIndex = i;
            var removeButton = $("<a href='#' data-role='button' data-inline='true' data-theme='a' data-mini='true'>Delete</a>");
            removeButton.css("margin-left", "6px");
            if (action.ActionType == mActionTypes.ActionTypes.If) {
                (<mIfAction.IfAction> action).showIf(domElement, removeButton);
                domElement.trigger("create");
                _this.setRemoveHandler(removeButton, i, domElement);
                continue;
            }
            if (action.ActionType == mActionTypes.ActionTypes.LoginRequest) {
                (<mLoginRequestAction.LoginRequestAction> action).showLogin(domElement, removeButton, this.marginLeft);
                domElement.trigger("create");
                _this.setRemoveHandler(removeButton, i, domElement);
                continue;
            }
            var containDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            containDiv.css("margin-left", this.marginLeft + "px");
            domElement.append(containDiv);
            action.show(containDiv);
            containDiv.append(removeButton);
            removeButton.button();
            domElement.trigger("create");
            this.setRemoveHandler(removeButton, i, domElement);
        }
        var newActionDiv = $("<div data-role='controlgroup' data-type='horizontal' name='addCP' id='AddCP' data-mini='true'></div>");
        newActionDiv.css("margin-left", this.marginLeft + "px");
        var selectAction = $("<select name='selectNewAction' data-theme='a' id='selectNewAction' data-inline='true 'data-mini='true'></select>");
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
        
        newActionDiv.append(selectAction);
        selectAction.selectmenu();
        var addActionButton = $("<a href='#' data-role='button' data-theme='a' data-mini='true'>Add action</a>");
        addActionButton.css("margin-left", "6px");
        domElement.append(addActionButton);
        newActionDiv.append(addActionButton);
        addActionButton.button();
        domElement.trigger("create");
        addActionButton.click(function () {
            switch (selectAction.val()) {
                case "saveSession":
                    _this.addAction(new mSaveSessionAction.SaveSessionAction());
                    _this.show(domElement);
                    mDesigner.Designer.instance.saveModel();
                    break;
                case "transition":
                    _this.addAction(new mTransitionAction.TransitionAction("main"));
                    _this.show(domElement);
                    mDesigner.Designer.instance.saveModel();
                    break;
                case "showMap":
                    _this.addAction(new mShowMapAction.ShowMapAction(""));
                    _this.show(domElement);
                    mDesigner.Designer.instance.saveModel();
                    break;
                case "patients":
                    _this.addAction(new mPatientsRequestAction.PatientsRequestAction("http://nb.infolan.me:54321"));
                    _this.show(domElement);
                    mDesigner.Designer.instance.saveModel();
                    break;
                case "login":
                    _this.addAction(new mLoginRequestAction.LoginRequestAction("http://nb.infolan.me:54321"));
                    _this.show(domElement);
                    mDesigner.Designer.instance.saveModel();
                    break;
                case "if":
                    _this.addAction(new mIfAction.IfAction(_this.marginLeft));
                    _this.show(domElement);
                    mDesigner.Designer.instance.saveModel();
                    break;
            }
        });
    }
    public toXML() {
        var seqCount = 0;
        var xml = "";
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
        return xml;
    }
}