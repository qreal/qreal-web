///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/util/log/Log", "src/Application", "src/device/Device"], function(require, exports, __Log__, __App__, __Device__) {
    var Log = __Log__;
    var App = __App__;
    var Device = __Device__;

    var Main = (function () {
        function Main() {
        }
        Main.Main = function () {
            Main.log.Debug("Main");
            if (!parent.window['app']) {
                parent.window['app'] = App.Instance;
            } else {
                App.Instance = parent.window['app'];
            }
            App.Instance.Device = new Device();
            App.Instance.Device.Init();
        };
        Main.log = new Log("DeviceMain");
        return Main;
    })();

    
    return Main;
});
//# sourceMappingURL=Main.js.map
