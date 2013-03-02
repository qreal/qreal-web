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
        var formsTree = document.createElement("li");
        $(formsTree).attr("data-role", "list-divider");
        $(formsTree).text("Forms");
        $(designerMenuDiv).append($(formsTree));
        var elementsPallete = document.createElement("li");
        $(elementsPallete).attr("data-role", "list-divider");
        $(elementsPallete).text("Widgets");
        $(designerMenuDiv).append($(elementsPallete));
        $(parentDiv).prepend($(designerMenuDiv));
        $(designerMenuDiv).listview();
    }
}
/*
<ul data - role = "listview" data - inset = "true" data - divider - theme = "d" >
            <li data - role = "list-divider" > Forms < / li >
            <li data - role = "list-divider" > Widgets < / li >
            <li>
                <div class ="ui-grid-d">
                    <div class = "ui-block-a" > <button type="submit" data-theme = "c" > Button < /button></div >
                </div >
            </li >
        </ul >

*/