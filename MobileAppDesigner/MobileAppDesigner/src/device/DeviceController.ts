import App = require("src/Application");
import Log = require("src/util/log/Log");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import ControlManager = require("src/device/ControlManager");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class DeviceController {

    private log = new Log("DeviceController");

    private eventManager: EventManager;
    private controlManager: ControlManager;


    constructor() {
        this.log.Debug("constructor");
        App.DeviceController = this;
        this.eventManager = new EventManager((<any>parent).$('body'));
        this.controlManager = new ControlManager();
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
                $('#' + data.id).children('.ui-btn-inner').children('.ui-btn-text').text(data.text);
            }
        });
    }

    public OnDrop(event) {
        this.log.Debug("OnDrop");
        event.preventDefault();
        this.log.DebugObj(event);
        var controlId = event.originalEvent.dataTransfer.getData("ControlId");      
        this.controlManager.CreateControl(controlId);       
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