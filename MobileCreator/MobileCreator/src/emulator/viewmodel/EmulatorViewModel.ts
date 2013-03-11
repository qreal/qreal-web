/// <reference path="../../../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");


export class EmulatorViewModel {
    private logger = new mLog.Logger("EmulatorViewModel");
    private $screen: JQuery;

    constructor() {
        this.logger.log("in constructor")
        this.$screen = $("#screen");
    }

    public showView(view: mControl.Control) {
        this.$screen.children().remove();
        this.$screen.append(view.$Control);
        view.create();
    }
}