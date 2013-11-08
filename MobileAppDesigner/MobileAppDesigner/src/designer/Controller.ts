import Log = require("src/util/log/Log");
import ToolsView = require("src/designer/ToolsView");

class Controller {

    private log = new Log("Controller");

    private static instance;

    private toolsView: ToolsView;

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
    }

    public Init(): void {
        this.log.Debug("Init");
        this.toolsView.Init();
    }
}

export = Controller;