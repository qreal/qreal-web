/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action");
import mActionTypes = module("designer/logic/ActionTypes");

export class SaveSessionAction extends mAction.Action {
    constructor() {
        this.ActionType = mActionTypes.ActionTypes.SaveSession;
        super();
    }
    public toXML() {
        var xml = "<save-session />\n";
        return xml;
    }
    public show(domeElement: JQuery) {
        var saveSessionBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>SaveSession</a>");
        domeElement.append(saveSessionBlock);
        saveSessionBlock.button();
    }
}