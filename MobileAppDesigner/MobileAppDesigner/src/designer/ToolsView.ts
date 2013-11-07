import Log = require("src/util/log/Log");

class ToolsView {

    private log = new Log("ToolsView");

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