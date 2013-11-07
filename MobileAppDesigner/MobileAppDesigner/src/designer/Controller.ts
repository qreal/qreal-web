import Log = require("src/util/log/Log");
import ToolsView = require("src/designer/ToolsView");

class Controller {

    private log = new Log("Controller");

    private static instance = new Controller();

    private toolsView: ToolsView;

    static get Instance() {
        return this.instance;
    }

    constructor() {
        this.toolsView = new ToolsView();
    }

    public Init() {
        this.log.Debug("Init!!");
        this.toolsView.Init();
    }
}

export = Controller;