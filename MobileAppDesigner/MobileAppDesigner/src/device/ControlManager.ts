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
        //var bt = $('<button></button>');

        $(event.currentTarget).append(bt);

        var prop: ButtonProperty = new ButtonProperty();
        prop.Type = 'Button';
        prop.Id = 'myId';
        prop.Text = 'Button';

        bt.attr('id', prop.Id);
        bt.text(prop.Text);

       

        var bt = bt.button();
        this.log.DebugObj(bt);


        bt.children('.ui-btn-inner').data('prop', prop);
        bt.on('click', event => {
            this.log.Debug('bt click');
            this.log.DebugObj($(event.target));
            this.log.DebugObj($(event.target).data('prop'));
            App.DeviceController.EventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
        });
    }

}

export = ControlManager;