define(["require", "exports", "src/Application", "src/util/log/Log", "src/device/DeviceController", "src/util/events/EventManager", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, __App__, __Log__, __DeviceController__, __EventManager__, __Property__, __ButtonProperty__) {
    var App = __App__;
    var Log = __Log__;
    var DeviceController = __DeviceController__;
    var EventManager = __EventManager__;
    
    var Property = __Property__;
    var ButtonProperty = __ButtonProperty__;

    var ControlManager = (function () {
        function ControlManager() {
            this.log = new Log("ControlManager");
            this.log.Debug("constructor");
        }
        ControlManager.prototype.Init = function () {
            this.log.Debug("Init");
            App.DeviceController.EventManager.AddSubscriber(EventManager.EventPropertiesChanged, new PropertyChangeListener());
        };

        ControlManager.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);
            this['Create' + controlId]();
        };

        ControlManager.prototype.CreateButton = function () {
            var _this = this;
            var bt = $('<a href="#" data-role="button"></a>');
            var prop = new ButtonProperty('id' + ControlManager.idIndex++);
            bt.attr('id', prop.Id);
            bt.text(prop.Text);
            $(event.currentTarget).append(bt);

            bt.on('click', function (event) {
                _this.log.Debug('bt click');
                _this.log.DebugObj($(event.target));
                _this.log.DebugObj($(event.target).data('prop'));
                App.DeviceController.EventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
            });

            var bt = bt.button();
            bt.children('.ui-btn-inner').data('prop', prop);
        };
        ControlManager.idIndex = 1;
        return ControlManager;
    })();

    var PropertyChangeListener = (function () {
        function PropertyChangeListener() {
            this.log = new Log("PropertyChangeListener");
        }
        PropertyChangeListener.prototype.OnEvent = function (data) {
            this.log.Debug("EventPropertiesChanged");
            this.log.DebugObj(data);
            if (data.text) {
                $('#' + data.id).children('.ui-btn-inner').children('.ui-btn-text').text(data.text);
            }
            if (data.inline) {
                var cond = data.inline == "true";
                $('#' + data.id).buttonMarkup({ inline: cond });
            }
            if (data.corners) {
                var cond = data.corners == "true";
                $('#' + data.id).buttonMarkup({ corners: cond });
            }
            if (data.mini) {
                var cond = data.mini == "true";
                $('#' + data.id).buttonMarkup({ mini: cond });
            }
            if (data.theme) {
                $('#' + data.id).buttonMarkup({ theme: data.theme });
            }
        };
        return PropertyChangeListener;
    })();

    
    return ControlManager;
});
//# sourceMappingURL=ControlManager.js.map
