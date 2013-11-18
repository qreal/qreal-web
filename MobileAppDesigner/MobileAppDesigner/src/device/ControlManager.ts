import App = require("src/Application");
import Log = require("src/util/log/Log");
import DeviceController = require("src/device/DeviceController");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class ControlManager {

    private log = new Log("ControlManager");

    private static idIndex = 1;

    constructor() {
        this.log.Debug("constructor");    
    }

    public CreateControl(controlId: string): void {
        this.log.Debug("CreateControl: " + controlId);
        this['Create' + controlId]();
    }

    private CreateButton() {
        var bt = $('<a href="#" data-role="button"></a>');
        var prop: ButtonProperty = new ButtonProperty('id' + ControlManager.idIndex);      
        bt.attr('id', prop.Id);
        bt.text(prop.Text);
        $(event.currentTarget).append(bt);

       
        this.log.DebugObj(bt);
        
        bt.on('click', event => {
            this.log.Debug('bt click');
            this.log.DebugObj($(event.target));
            this.log.DebugObj($(event.target).data('prop'));
            App.DeviceController.EventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
        });

        var bt = bt.button();
        bt.children('.ui-btn-inner').data('prop', prop);
    }

}

export = ControlManager;