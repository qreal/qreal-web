import Log = require("src/util/log/Log");

class DeviceController {

    private log = new Log("DeviceController");

    private static instance;

    static get Instance(): DeviceController {
        new Log("DeviceController").Debug("get Instance");
        if (!this.instance) {
            this.instance = new DeviceController();
        }
        return this.instance;
    }

    constructor() {
        this.log.Debug("In constructor");
    }

    public Init(): void {
        this.log.Debug("Init");
        $('#mainPage').on('drop', event => this.OnDrop(event));
        $('#mainPage').on('dragover', event => this.OnDragOver(event));
        var self = this;
        (<any>parent).$('body').on('eventname', function (e) {
            self.log.Debug("Yesss!!!");
        });



    }

    public OnDrop(event) {
        this.log.Debug("OnDrop");
        event.preventDefault();
        console.log(event);
        var data = event.originalEvent.dataTransfer.getData("ControlId");
        this.log.Debug("OnDrop. data: " + data);

        var bt = $("<button>My Button</button>");
        $(event.currentTarget).append(bt);
        bt.button();
    }

    public OnDragOver(e) {
        //this.log.Debug("OnDragOver");
        e.preventDefault();
    }
}

export = DeviceController;