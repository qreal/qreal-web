/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mActionTypes = module("designer/logic/ActionTypes");

export class Action {
    private actionType;

    get ActionType() {
        return this.actionType;
    }
    set ActionType(actionType) {
        this.actionType = actionType;
    }
    public toXML() {
        return "";
    }

    public show(domElement: JQuery) {
    }
}