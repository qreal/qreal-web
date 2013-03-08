/// <reference path="../../../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mDesignerController = module("designer/controller/DesignerController");
import mWidgetView = module("designer/view/WidgetView");

export class DesignerView {
    private controller: mDesignerController.DesignerController;
    private form: JQuery;
    private baseLayout: mWidgetView.WidgetView;

    constructor(controller: mDesignerController.DesignerController, form: JQuery) {
        this.controller = controller;
        this.form = form;
    }

    get BaseLayout() {
        return this.baseLayout;
    }

    set BaseLayout(widgetView: mWidgetView.WidgetView) {
        this.baseLayout = widgetView;
    }

    public draw() {
        this.baseLayout.draw();
        this.form.append(this.baseLayout.Control);
    }
}