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

            var self = this;
            this.eventManager.AddSubscriber(EventManager.EventPropertiesChanged, {
                OnEvent: function (data) {
                    self.log.Debug("EventPropertiesChanged");
                    self.log.DebugObj(data);
                    $('#' + data.id).siblings('.ui-btn-inner').children('.ui-btn-text').text(data.text);
                }
            });
        };

        DeviceController.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop");
            event.preventDefault();
            this.log.DebugObj(event);
            var controlId = event.originalEvent.dataTransfer.getData("ControlId");
            this.CreateControl(controlId);
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

        DeviceController.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);

            //var bt = $('<a href="#" data-role="button"></a>');
            var bt = $('<button></button>');

            //bt = bt.button();
            $(event.currentTarget).append(bt);

            var prop = new ButtonProperty();
            prop.Type = 'Button';
            prop.Id = 'myId';
            prop.Text = 'Button';

            bt.attr('id', prop.Id);
            bt.html(prop.Text);

            bt.data('prop', prop);

            var self = this;
            bt.on('click', function (event) {
                self.log.Debug('bt click');
                self.log.DebugObj($(event.target).data('prop'));
                self.eventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
            });
            var b = bt.button();
            this.log.DebugObj(b);
            this.log.Debug(b.attr('id'));
            this.log.DebugObj($('#myId'));
        };
        DeviceController.instance = new DeviceController();
        return DeviceController;
    })();

    
    return DeviceController;
});
//# sourceMappingURL=DeviceController.js.map
