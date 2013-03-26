/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action");
import mDesigner = module("designer/Designer");

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

    public show(domElement) {
        var saveSessionBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>Go to form </a>");     
        var formNames = mDesigner.Designer.formNames;
        var select = $("<select data-mini='true' data-inline='true'></select>");
        domElement.append(saveSessionBlock);
        domElement.append(select);
        saveSessionBlock.button();
        select.selectmenu();
        var _select = select;
        select.mouseover(function () {
            _select.empty();
            for (var i = 0; i < formNames.length; i++) {
                var option = $("<option value='" + formNames[i] + "'>" + formNames[i] + "</option>");
                _select.append(option);
            }
            _select.selectmenu("refresh", true);
        });
    }
}