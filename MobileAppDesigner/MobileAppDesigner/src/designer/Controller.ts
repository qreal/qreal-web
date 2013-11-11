import Log = require("src/util/log/Log");
import EventManager = require("src/util/events/EventManager");
import ToolsView = require("src/designer/ToolsView");
import PropertiesView = require("src/designer/PropertiesView");

class Controller {

    private log = new Log("Controller");

    private static instance = new Controller();

    private toolsView: ToolsView;
    private eventManager: EventManager;
    private propertiesView: PropertiesView;

    static get Instance(): Controller {
        return this.instance;
    }

    constructor() {
        this.log.Debug("constructor");
        this.toolsView = new ToolsView(this);
        this.propertiesView = new PropertiesView(this);
        this.eventManager = new EventManager($('body'));
    }

    public Init(): void {
        this.log.Debug("Init");
        this.toolsView.Init();
        this.propertiesView.Init();
    }

    public get EventManager(): EventManager {
        return this.eventManager;
    }
}

export = Controller;