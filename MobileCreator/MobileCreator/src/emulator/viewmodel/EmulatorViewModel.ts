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

    public addView(view: mControl.Control):void {
        this.logger.log("addView \n" + view.$Control.html());
        this.$screen.append(view.$Control);
        this.$screen.trigger('create');
        this.$screen.children().hide();
    }

    public showView(view: mControl.Control):void {
        this.logger.log("showView");
        this.$screen.children().hide();
        view.$Control.show();
    }

    public clear():void {
        this.$screen.children().remove();
    }

    public getInputText(inputId: string):string {
        return this.$screen.find("#" + inputId).val();
    }
}