///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />

import Log = require("src/util/log/Log");
import App = require("src/Application");
import Device = require("src/device/Device");

class Main {

    private static log = new Log("DeviceMain");

    public static Main(): void {
        Main.log.Debug("Main");
        if (!parent.window['app']) {
            parent.window['app'] = App.Instance;
        } else {
            App.Instance = <App>parent.window['app'];
        }
        App.Instance.Device = new Device();
        App.Instance.Device.Init();
    }
}

export = Main;