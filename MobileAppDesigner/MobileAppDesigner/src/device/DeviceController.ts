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
    }

    public OnDrop(event) {
        this.log.Debug("OnDrop");
        event.preventDefault();
        this.log.DebugObj(event);
        var data = event.originalEvent.dataTransfer.getData("ControlId");
        this.log.Debug("OnDrop. data: " + data);

        var bt = $("<button>My Button</button>");
        $(event.currentTarget).append(bt);

        var prop: ButtonProperty = new ButtonProperty();
        prop.Type = 'Button'
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
    }

    public OnDragOver(e) {
        //this.log.Debug("OnDragOver");
        e.preventDefault();
    }

    public get EventManager(): EventManager {
        return this.eventManager;
    }

}

export = DeviceController;