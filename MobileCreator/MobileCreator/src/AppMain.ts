import Log = module("utils/log/log");
import StateController = module("statecontroller");
/// <reference path="../lib/jquery.d.ts" />

export class Application {
    private logger = new Log.LogManager("Application");

    public onCreate() {
        this.logger.log("onCreate");
        $("#btChange").text("Designer");
        $("#btChange").click(function () {
            StateController.StateController.changeState();
        });
    }
}