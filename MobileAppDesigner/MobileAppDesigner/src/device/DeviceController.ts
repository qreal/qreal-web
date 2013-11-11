import Log = require("src/util/log/Log");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");

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

        var self = this;
        this.eventManager.AddSubscriber(EventManager.EventTest, {
            OnEvent: (data) => {
                self.log.Debug("OnEvent");
                self.log.DebugObj(data);
            }
        });
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

        var self = this;
        bt.on('click', e => {
            self.log.Debug('bt click');
            self.eventManager.Trigger(EventManager.EventShowProperties, { id: 'buttonId' });
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