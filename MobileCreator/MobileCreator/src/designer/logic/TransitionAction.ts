/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action");
import mDesigner = module("designer/Designer");
import mActionTypes = module("designer/logic/ActionTypes");

export class TransitionAction extends mAction.Action {
    private formId: string;

    constructor(formId: string) {
        super();
        this.ActionType = mActionTypes.ActionTypes.Transition;
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


    public show(domElement) {
        var _this = this;
        var saveSessionBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Go to form </a>");
        saveSessionBlock.css("margin-right", "6px");
        var formNames = mDesigner.Designer.formNames;
        var select = $("<select data-mini='true' data-inline='true'></select>");
        var selectedOption = $("<option value='" + this.formId + "' selected='selected'>" + this.formId + "</option>");
        select.append(selectedOption);
        domElement.append(saveSessionBlock);
        domElement.append(select);
        saveSessionBlock.button();
        select.selectmenu();
        var _select = select;
        select.mouseover(function () {
            _select.empty();
            for (var i = 0; i < formNames.length; i++) {
                var option = $("<option value='" + formNames[i] + "'>" + formNames[i] + "</option>");
                if (_this.formId == formNames[i]) {
                    option.attr("selected", "selected");
                }
                _select.append(option);
            }
            _select.selectmenu("refresh", true);
        });
        select.change(function () {
            _this.formId = _select.val();
        });
    }
}