///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />

import DeviceController = require("src/device/DeviceController");
import Log = require("src/util/log/Log");

class Main {

    private static log = new Log("App");

    public static Main(): void {
        Main.log.Debug("Main");
        DeviceController.Instance.Init();
    }
}

export = Main;