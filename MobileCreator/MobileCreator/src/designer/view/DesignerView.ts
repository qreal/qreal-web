/// <reference path="../../../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mDesignerController = module("designer/controller/DesignerController");

export class DesignerView {
    private controller: mDesignerController.DesignerController;

    constructor(controller: mDesignerController.DesignerController) {
        this.controller = controller;
    }
}