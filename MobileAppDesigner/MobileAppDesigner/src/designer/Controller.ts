import Log = require("src/util/log/Log");
import App = require("src/Application");
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
        App.DesignerController = this;
        this.toolsView = new ToolsView();
        this.propertiesView = new PropertiesView();
        this.eventManager = new EventManager($('body'));
    }

    public Init(): void {
        this.log.Debug("Init");
        this.toolsView.Init();
        this.propertiesView.Init();
    }

    get EventManager(): EventManager {
        return this.eventManager;
    }

    public Test(): void {
        alert('Designer Test!!!!');
    }
}

export = Controller;