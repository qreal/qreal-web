///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/util/log/Log", "src/device/DeviceController"], function(require, exports, __Log__, __DeviceController__) {
    var Log = __Log__;
    var DeviceController = __DeviceController__;

    var Main = (function () {
        function Main() {
        }
        Main.Main = function () {
            Main.log.Debug("Main");
            new DeviceController().Init();
        };
        Main.log = new Log("DeviceMain");
        return Main;
    })();

    
    return Main;
});
//# sourceMappingURL=Main.js.map
