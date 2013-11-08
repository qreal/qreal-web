import Log = require("src/util/log/Log");

class ToolsView {

    private log = new Log("ToolsView");

    private controls = [
        {
            title: 'Button',
            icon: 'button.png'
        },
        {
            title: 'Button2',
            icon: 'button.png'
        },
        {
            title: 'Button2',
            icon: 'button.png'
        },
        {
            title: 'Button2',
            icon: 'button.png'
        },
        {
            title: 'Button2',
            icon: 'button.png'
        },
        {
            title: 'Button2',
            icon: 'button.png'
        }
    ]

    constructor() { }

    public Init() {
        this.log.Debug("Init");

        $('#toolTmpl').tmpl(this.controls).appendTo('#controls');
    }
}

export = ToolsView;