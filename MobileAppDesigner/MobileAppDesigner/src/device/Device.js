define(["require", "exports", "src/Application", "src/util/log/Log", "src/util/events/EventManager", "src/device/ControlManager", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, __App__, __Log__, __EventManager__, __ControlManager__, __Property__, __ButtonProperty__) {
    var App = __App__;
    var Log = __Log__;
    var EventManager = __EventManager__;
    
    var ControlManager = __ControlManager__;
    var Property = __Property__;
    var ButtonProperty = __ButtonProperty__;

    var Device = (function () {
        function Device() {
            this.log = new Log("Device");
            this.log.Debug("constructor");
            this.eventManager = new EventManager((parent).$('body'));
            this.controlManager = new ControlManager();
        }
        Device.prototype.Init = function () {
            this.log.Debug("Init");
            this.controlManager.Init();
        };

        Object.defineProperty(Device.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Device.prototype, "ControlManager", {
            get: function () {
                return this.controlManager;
            },
            enumerable: true,
            configurable: true
        });
        return Device;
    })();

    
    return Device;
});
//# sourceMappingURL=Device.js.map
