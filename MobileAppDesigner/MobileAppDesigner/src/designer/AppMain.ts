import Controlller = require("src/designer/controller/Controller");
import Log = require("util/log/Log");

class App {

    private static log = new Log("App");

    public static Main(): void {
        App.log.Debug("Main");
        Controlller.Instance.Init();
    }
}

export = App;