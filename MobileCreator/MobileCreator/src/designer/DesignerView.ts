import Log = module("utils/log/Log");
/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/jqueryui.d.ts" />

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
        var formsAccordion = document.createElement("div");
        formsAccordion.setAttribute("id", "formsAccordion");

        //STUB. Real forms loading will be here
        for (var i = 0; i < 4; i++) {
            var heading = document.createElement("h3");
            $(heading).text("Some form");
            var div = document.createElement("div");
            var content = document.createElement("p");
            $(content).text("STUB :(");
            $(formsAccordion).append(heading);
            $(formsAccordion).append(div);
            $(div).append(content);
        }
        $(designerMenuDiv).append(formsAccordion);
        //END STUB
    }
}