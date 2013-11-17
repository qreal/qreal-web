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
        ControlManager.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);
            this['Create' + controlId]();
        };

        ControlManager.prototype.CreateButton = function () {
            var _this = this;
            var bt = $('<a href="#" data-role="button"></a>');

            //var bt = $('<button></button>');
            $(event.currentTarget).append(bt);

            var prop = new ButtonProperty();
            prop.Type = 'Button';
            prop.Id = 'myId';
            prop.Text = 'Button';

            bt.attr('id', prop.Id);
            bt.text(prop.Text);

            var bt = bt.button();
            this.log.DebugObj(bt);

            bt.children('.ui-btn-inner').data('prop', prop);
            bt.on('click', function (event) {
                _this.log.Debug('bt click');
                _this.log.DebugObj($(event.target));
                _this.log.DebugObj($(event.target).data('prop'));
                App.DeviceController.EventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
            });
        };
        ControlManager.idIndex = 1;
        return ControlManager;
    })();

    
    return ControlManager;
});
//# sourceMappingURL=ControlManager.js.map
