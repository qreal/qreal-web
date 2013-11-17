///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />

import Log = require("src/util/log/Log");
import DeviceController = require("src/device/DeviceController");

class Main {

    private static log = new Log("DeviceMain");

    public static Main(): void {
        Main.log.Debug("Main");     
        new DeviceController().Init();
    }
}

export = Main;