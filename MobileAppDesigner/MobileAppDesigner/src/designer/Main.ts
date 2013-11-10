///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />

import Controller = require("src/designer/Controller");
import Log = require("src/util/log/Log");

class Main {

    private static log = new Log("DesignerMain");

    public static Main(): void {
        Main.log.Debug("Main");
        Controller.Instance.Init();     
    }
}


export = Main;