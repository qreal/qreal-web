/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/jquery.tmpl.d.ts" />
/// <reference path="../../../Scripts/typings/jquerymobile/jquerymobile.d.ts" />
define(["require", "exports", "src/util/log/Log", "src/Application", "src/device/Device", "src/util/events/EventManager"], function(require, exports, Log, App, Device, EventManager) {
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
            App.Instance.Device.EventManager.Trigger(EventManager.OnDeviceLoaded);
        };
        Main.log = new Log("DeviceMain");
        return Main;
    })();

    
    return Main;
});
//# sourceMappingURL=Main.js.map
