define(["require", "exports", "src/util/log/Log", "src/util/events/EventManager", "src/device/ControlManager"], function(require, exports, Log, EventManager, ControlManager) {
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
