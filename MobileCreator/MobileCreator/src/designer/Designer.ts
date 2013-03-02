/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mLog = module("utils/log/Log");

export class Designer {
    private logger = new mLog.Logger("Designer");

    public static instance = new Designer();

    constructor() {
    }

    public initDesigner() {
        this.logger.log("Init designer");
        var parentDiv = $("#menu");
        var designerMenuDiv = document.createElement("ul");
        $(designerMenuDiv).attr("data-role", "listview");
        $(designerMenuDiv).attr("data-inset", "true");
        $(designerMenuDiv).attr("data-divider-theme", "d");

        var formsTreeHeader = document.createElement("li");
        $(formsTreeHeader).attr("data-role", "list-divider");
        $(formsTreeHeader).text("Forms");
        $(designerMenuDiv).append($(formsTreeHeader));

        var elementsPalleteHeader = document.createElement("li");
        $(elementsPalleteHeader).attr("data-role", "list-divider");
        $(elementsPalleteHeader).text("Widgets");
        $(designerMenuDiv).append($(elementsPalleteHeader));

        var elementsPalleteContainer = document.createElement("li");
        $(designerMenuDiv).append($(elementsPalleteContainer));

        var elementsPallete = document.createElement("div");
        $(elementsPallete).addClass("ui-grid-c");
        $(elementsPalleteContainer).append($(elementsPallete));

        var buttonElementField = document.createElement("div");
        $(buttonElementField).addClass("ui-block-a");
        var buttonElement = document.createElement("a");
        $(buttonElement).attr("data-role", "button");
        $(buttonElement).text("Button");
        $(buttonElementField).append($(buttonElement));
        $(elementsPallete).append($(buttonElementField));

        var buttonElementField2 = document.createElement("div");
        $(buttonElementField2).addClass("ui-block-b");
        var buttonElement2 = document.createElement("a");
        $(buttonElement2).attr("data-role", "button");
        $(buttonElement2).text("Button");
        $(buttonElementField2).append($(buttonElement2));
        $(elementsPallete).append($(buttonElementField2));

        $(parentDiv).prepend($(designerMenuDiv));
        $(designerMenuDiv).listview();
    }
}
