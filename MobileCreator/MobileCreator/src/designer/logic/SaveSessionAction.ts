/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mAction = module("designer/logic/Action");

export class SaveSessionAction extends mAction.Action {
    constructor() {
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