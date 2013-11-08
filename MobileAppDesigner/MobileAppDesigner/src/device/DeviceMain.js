///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/device/DeviceController", "src/util/log/Log"], function(require, exports, __DeviceController__, __Log__) {
    var DeviceController = __DeviceController__;
    var Log = __Log__;

    var DeviceApp = (function () {
        function DeviceApp() {
        }
        DeviceApp.Main = function () {
            DeviceApp.log.Debug("Main");
            DeviceController.Instance.Init();
        };
        DeviceApp.log = new Log("App");
        return DeviceApp;
    })();

    
    return DeviceApp;
});
//# sourceMappingURL=DeviceMain.js.map
