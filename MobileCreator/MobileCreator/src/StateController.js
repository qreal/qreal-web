var Controller;
(function (Controller) {
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
            } else {
            }
        };
        return StateController;
    })();
    Controller.StateController = StateController;    
})(Controller || (Controller = {}));
