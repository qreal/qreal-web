/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/jquery.tmpl.d.ts" />

import Designer = require("src/designer/Designer");
import Log = require("src/util/log/Log");
import App = require("src/Application");

class Main {

    private static log = new Log("DesignerMain");

    public static Main(): void {
        Main.log.Debug("Main");
        if (!window['app']) {
            window['app'] = App.Instance;
        } else {
            App.Instance = <App>window['app'];
        }
        App.Instance.Designer = new Designer();
        App.Instance.Designer.Init();
    }
}


export = Main;