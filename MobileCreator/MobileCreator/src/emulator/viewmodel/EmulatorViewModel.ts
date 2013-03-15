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

    public showViewAndCreate(view: mControl.Control) {
        this.logger.log("showViewAndCreate");
        this.$screen.children().hide();
        this.$screen.append(view.$Control);
        this.$screen.trigger('create');
        //view.create();
    }

    public showView(view: mControl.Control) {
        this.logger.log("showView");
        this.$screen.children().hide();
        view.$Control.show();
    }
}