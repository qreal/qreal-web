define(["require", "exports", "utils/log/log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var StateController = (function () {
        function StateController() {
            StateController.logger.log("constructor");
        }
        StateController.Designer = 1;
        StateController.Emulator = 2;
        StateController.state = StateController.Designer;
        StateController.logger = new Log.LogManager("StateController");
        StateController.changeState = function changeState() {
            StateController.state = StateController.state == StateController.Designer ? StateController.Emulator : StateController.Designer;
            StateController.logger.log("changeState: " + StateController.state);
            if(StateController.state == StateController.Designer) {
                $("#btChange").text("Designer");
            } else {
                $("#btChange").text("Emulator");
            }
        };
        return StateController;
    })();
    exports.StateController = StateController;    
})
