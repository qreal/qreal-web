define(["require", "exports", "src/Application", "src/util/log/Log", "src/util/events/EventManager", "src/device/ControlManager", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, App, Log, EventManager, ControlManager, Property, ButtonProperty) {
    var Device = (function () {
        function Device() {
            this.log = new Log("Device");
            this.log.Debug("constructor");
            this.eventManager = new EventManager(parent.$('body'));
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
