///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/device/DeviceController", "src/util/log/Log"], function(require, exports, __DeviceController__, __Log__) {
    var DeviceController = __DeviceController__;
    var Log = __Log__;

    var Main = (function () {
        function Main() {
        }
        Main.Main = function () {
            Main.log.Debug("Main");
            DeviceController.Instance.Init();
        };
        Main.log = new Log("App");
        return Main;
    })();

    
    return Main;
});
//# sourceMappingURL=Main.js.map
