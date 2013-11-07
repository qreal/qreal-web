///<reference path="../modules/jquery.d.ts" />

import Controlller = require("src/designer/Controller");
import Log = require("src/util/log/Log");

class App {

    private static log = new Log("App");

    public static Main(): void {
        App.log.Debug("Main");
        Controlller.Instance.Init();
    }
}

export = App;