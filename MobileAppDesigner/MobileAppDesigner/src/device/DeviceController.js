define(["require", "exports", "src/util/log/Log", "src/util/events/EventManager", "src/properties/PropertyHelper", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, __Log__, __EventManager__, __PropertyHelper__, __Property__, __ButtonProperty__) {
    var Log = __Log__;
    var EventManager = __EventManager__;
    
    var PropertyHelper = __PropertyHelper__;
    var Property = __Property__;
    var ButtonProperty = __ButtonProperty__;

    var DeviceController = (function () {
        function DeviceController() {
            this.log = new Log("DeviceController");
            this.log.Debug("constructor");
            this.eventManager = new EventManager((parent).$('body'));
        }
        Object.defineProperty(DeviceController, "Instance", {
            get: function () {
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        DeviceController.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");
            $('#mainPage').on('drop', function (event) {
                return _this.OnDrop(event);
            });
            $('#mainPage').on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
        };

        DeviceController.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop");
            event.preventDefault();
            this.log.DebugObj(event);
            var data = event.originalEvent.dataTransfer.getData("ControlId");
            this.log.Debug("OnDrop. data: " + data);

            var bt = $("<button>My Button</button>");
            $(event.currentTarget).append(bt);

            var prop = new ButtonProperty();
            prop.Type = 'Button';
            prop.Id = 'myId';
            prop.Text = 'Button';
            var jsonProp = PropertyHelper.ToJson(prop);
            this.log.Debug("json prop: " + jsonProp);
            this.log.DebugObj(PropertyHelper.FromJson(jsonProp));

            bt.data('prop', jsonProp);

            var self = this;
            bt.on('click', function (event) {
                self.log.Debug('bt click');
                self.log.DebugObj($(event.target).data('prop'));
                self.eventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
            });
            bt.button();
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
        DeviceController.instance = new DeviceController();
        return DeviceController;
    })();

    
    return DeviceController;
});
//# sourceMappingURL=DeviceController.js.map
