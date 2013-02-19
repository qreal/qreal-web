/// <reference path="./utils/log/log.ts" />

module Controller {
    //TODO: подумать над всей этой статичностью, сделать синглтоны
    export class StateController {
        private static Designer: number = 1;
        private static Emulator: number = 2;
        private static state: number = StateController.Designer;

        private static logger = new Log.LogManager("StateController");

        constructor() {
            StateController.logger.log("constructor");
        }

        public static changeState() {
            StateController.state = StateController.state == StateController.Designer ? StateController.Emulator : StateController.Designer;
            StateController.logger.log("changeState: " + StateController.state);
            if (StateController.state == StateController.Designer) {

            } else {

            }
        }
    }
}