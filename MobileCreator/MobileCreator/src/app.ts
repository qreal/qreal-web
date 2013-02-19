/// <reference path="./utils/log/log.ts" />
/// <reference path="./statecontroller.ts" />
/// <reference path="../lib/jquery.d.ts" />

window.onload = () => {
    var logger = new Log.LogManager("App");
    logger.log("loaded");
    $("#btChange").click(function () {
        Controller.StateController.changeState();
    });
};