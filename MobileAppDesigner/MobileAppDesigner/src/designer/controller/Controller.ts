import Log = require("util/log/Log");

class Controller {

    private log = new Log("Controller");

    private static instance = new Controller();

    static get Instance() {
        return this.instance;
    }

    constructor() {
    }

    public Init() {
        this.log.Debug("Init!!");
    }
}

export = Controller;