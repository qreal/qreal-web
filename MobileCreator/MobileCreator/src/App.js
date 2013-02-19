window.onload = function () {
    var logger = new Log.LogManager("App");
    logger.log("loaded");
    $("#btChange").click(function () {
        Controller.StateController.changeState();
    });
};
