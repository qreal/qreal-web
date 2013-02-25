import Log = module("utils/log/Log");
/// <reference path="../../lib/jquery.d.ts" />

export class DesignerView {
    private baseDiv: JQuery;

    constructor(baseDiv: JQuery) {
        this.baseDiv = baseDiv;
    }

    public initDesigner() {
        var designerMenuDiv = document.createElement("div");
        designerMenuDiv.setAttribute("id", "designerMenu");
        var designerSceneDiv = document.createElement("div");
        designerSceneDiv.setAttribute("id", "designerScene");
        this.baseDiv.prepend(designerSceneDiv);
        this.baseDiv.prepend(designerMenuDiv);

    }
}