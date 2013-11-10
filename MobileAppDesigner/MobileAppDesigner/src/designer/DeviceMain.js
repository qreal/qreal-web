///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/designer/Controller", "src/util/log/Log"], function(require, exports, __Controller__, __Log__) {
    var Controller = __Controller__;
    var Log = __Log__;

    var Device = (function () {
        function Device() {
        }
        Device.Main = function () {
            Device.log.Debug("Main");
            Controller.Instance.Init();
        };

        Device.prototype.test = function () {
            alert('test');
        };
        Device.log = new Log("App");
        return Device;
    })();

    
    return Device;
});
//# sourceMappingURL=DeviceMain.js.map
