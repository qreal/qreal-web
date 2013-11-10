import Log = require("src/util/log/Log");
import ToolsView = require("src/designer/ToolsView");
import EventManager = require("src/util/events/EventManager");

class Controller {

    private log = new Log("Controller");

    private static instance;

    private toolsView: ToolsView;
    private eventManager: EventManager;

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
        this.eventManager = new EventManager($('body'));
    }

    public Init(): void {
        this.log.Debug("Init");
        this.toolsView.Init();
    }

    public get EventManager(): EventManager {
        return this.eventManager;
    }
}

export = Controller;