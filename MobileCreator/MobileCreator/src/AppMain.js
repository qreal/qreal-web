define(["require", "exports", "utils/log/log", "Statecontroller"], function(require, exports, __Log__, __StateController__) {
    var Log = __Log__;

    var StateController = __StateController__;

    var Application = (function () {
        function Application() {
            this.logger = new Log.LogManager("Application");
        }
        Application.prototype.onCreate = function () {
            this.logger.log("onCreate");
            $("#btChange").text("Designer");
            $("#btChange").click(function () {
                StateController.StateController.changeState();
            });
        };
        return Application;
    })();
    exports.Application = Application;    
})
