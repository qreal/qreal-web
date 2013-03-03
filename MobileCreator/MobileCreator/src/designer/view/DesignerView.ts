/// <reference path="../../../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mDesignerController = module("designer/controller/DesignerController");

export class DesignerView {
    private controller: mDesignerController.DesignerController;
    private form: JQuery;

    constructor(controller: mDesignerController.DesignerController, form: JQuery) {
        this.controller = controller;
        this.form = form;
    }

    
}