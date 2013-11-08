import Log = require("src/util/log/Log");
import ToolsView = require("src/designer/ToolsView");
import DeviceManager = require("src/designer/DeviceManager");

class Controller {

    private log = new Log("Controller");

    private static instance;

    private toolsView: ToolsView;
    private deviceManager: DeviceManager;

    static get Instance(): Controller {
        new Log("Controller").Debug("get Instance");
        if (!this.instance) {
            this.instance = new Controller();
        }
        return this.instance;
    }

    constructor() {
        this.log.Debug("In constructor");
        this.toolsView = new ToolsView(this);
        this.deviceManager = new DeviceManager();
    }

    public Init(): void {
        this.log.Debug("Init");
        this.toolsView.Init();
    }

    public get DeviceManager(): DeviceManager {
        return this.deviceManager;
    }
}

export = Controller;