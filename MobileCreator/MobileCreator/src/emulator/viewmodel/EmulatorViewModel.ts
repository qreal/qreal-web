/// <reference path="../../../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");


export class EmulatorViewModel {
    private logger = new mLog.Logger("EmulatorViewModel");
    private $screen: JQuery;

    constructor() {
        this.logger.log("in constructor");
        this.$screen = $("#screen");
    }

    public addView(view: mControl.Control) {
        this.logger.log("addView");
        this.$screen.append(view.$Control);
        this.$screen.trigger('create');
        this.$screen.children().hide();
    }

    public showView(view: mControl.Control) {
        this.logger.log("showView");
        this.$screen.children().hide();
        view.$Control.show();
    }

    public clear() {
        this.$screen.children().remove();
    }
}