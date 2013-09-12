import Log = require("util/log/Log");

class ToolsView {

    private log = new Log("Controller");

    constructor() { }

    public Init() {
        this.log.Debug("Init");

        //TODO: stub
        var img = $('<img id="button">');
        img.attr('src', 'res/button.png');
        img.appendTo('#controls');
    }
}

export = ToolsView;