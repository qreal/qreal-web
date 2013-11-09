///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />

import Controller = require("src/designer/Controller");
import Log = require("src/util/log/Log");

class App {

    private static log = new Log("App");

    public static Main(): void {
        App.log.Debug("Main");
        Controller.Instance.Init();     
    }

    private test() {
        alert('test');
    }

}


export = App;