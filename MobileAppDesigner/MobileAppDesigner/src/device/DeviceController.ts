import Log = require("src/util/log/Log");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import PropertyHelper = require("src/properties/PropertyHelper");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class DeviceController {

    private log = new Log("DeviceController");

    private static instance = new DeviceController();

    private eventManager: EventManager;

    static get Instance(): DeviceController {
        return this.instance;
    }

    constructor() {
        this.log.Debug("constructor");
        this.eventManager = new EventManager((<any>parent).$('body'));
    }

    public Init(): void {
        this.log.Debug("Init");
        $('#mainPage').on('drop', event => this.OnDrop(event));
        $('#mainPage').on('dragover', event => this.OnDragOver(event));

        var self = this;
        this.eventManager.AddSubscriber(EventManager.EventPropertiesChanged, {
            OnEvent: (data) => {
                self.log.Debug("EventPropertiesChanged");
                self.log.DebugObj(data);
                $('#' + data.id).siblings('.ui-btn-inner').children('.ui-btn-text').text(data.text);
            }
        });
    }

    public OnDrop(event) {
        this.log.Debug("OnDrop");
        event.preventDefault();
        this.log.DebugObj(event);
        var controlId = event.originalEvent.dataTransfer.getData("ControlId");      
        this.CreateControl(controlId);       
    }

    public OnDragOver(e) {
        //this.log.Debug("OnDragOver");
        e.preventDefault();
    }

    public get EventManager(): EventManager {
        return this.eventManager;
    }

    private CreateControl(controlId: string): void {
        this.log.Debug("CreateControl: " + controlId);
        //var bt = $('<a href="#" data-role="button"></a>');
        var bt = $('<button></button>');
        //bt = bt.button();

        $(event.currentTarget).append(bt);

        var prop: ButtonProperty = new ButtonProperty();
        prop.Type = 'Button'
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
    }

}

export = DeviceController;