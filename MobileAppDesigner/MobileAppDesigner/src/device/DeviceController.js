define(["require", "exports", "src/Application", "src/util/log/Log", "src/util/events/EventManager", "src/device/ControlManager", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, __App__, __Log__, __EventManager__, __ControlManager__, __Property__, __ButtonProperty__) {
    var App = __App__;
    var Log = __Log__;
    var EventManager = __EventManager__;
    
    var ControlManager = __ControlManager__;
    var Property = __Property__;
    var ButtonProperty = __ButtonProperty__;

    var DeviceController = (function () {
        function DeviceController() {
            this.log = new Log("DeviceController");
            this.log.Debug("constructor");
            App.DeviceController = this;
            parent.window['test'] = this;
            this.eventManager = new EventManager((parent).$('body'));
            this.controlManager = new ControlManager();
        }
        DeviceController.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");
            this.controlManager.Init();
            $('#mainPage').on('drop', function (event) {
                return _this.OnDrop(event);
            });
            $('#mainPage').on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
        };

        DeviceController.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("ControlId");
            this.controlManager.CreateControl(controlId);
        };

        DeviceController.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };

        Object.defineProperty(DeviceController.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });

        DeviceController.prototype.Test = function () {
            alert('Device Test!!!!');
        };
        return DeviceController;
    })();

    
    return DeviceController;
});
//# sourceMappingURL=DeviceController.js.map
