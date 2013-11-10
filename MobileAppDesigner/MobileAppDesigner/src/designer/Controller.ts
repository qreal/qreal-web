import Log = require("src/util/log/Log");
import ToolsView = require("src/designer/ToolsView");
import EventManager = require("src/util/events/EventManager");

class Controller {

    private log = new Log("Controller");

    private static instance = new Controller();

    private toolsView: ToolsView;
    private eventManager: EventManager;

    static get Instance(): Controller {
        return this.instance;
    }

    constructor() {
        this.log.Debug("constructor");
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