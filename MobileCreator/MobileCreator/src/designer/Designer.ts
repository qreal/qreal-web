/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />
import mLog = module("utils/log/Log");

export class Designer {
    private logger = new mLog.Logger("Designer");

    public static instance = new Designer();

    constructor() {
    }

    public initDesigner() {
        this.logger.log("Init designer");
        var parentDiv = $("#deigner");
        var designerMenuDiv = document.createElement("div");
        designerMenuDiv.setAttribute("id", "designerMenu");
        var designerSceneDiv = document.createElement("div");
        designerSceneDiv.setAttribute("id", "designerScene");
        parentDiv.prepend(designerSceneDiv);
        parentDiv.prepend(designerMenuDiv);
    }
}