import Log = require("src/util/log/Log");

class DeviceManager {

    private log = new Log("DeviceManager");
    private deviceFrame;
    private contents;

    constructor() {
        this.log.Debug("Init");

        var self = this;
        this.deviceFrame = $('#app-content-frame');
        this.deviceFrame.ready(function () {
            self.log.Debug('app-content-frame laoded');
            self.contents = self.deviceFrame.contents();
            self.contents.find('#mainPage').bind('drop', event => self.OnDrop(event));
            self.contents.find('#mainPage').bind('dragover', event => self.OnDragOver(event));
        });
    }

    public OnDrop(event) {
        this.log.Debug("OnDrop");
        event.preventDefault();
        var data = event.dataTransfer.getData("ControlId");
        this.log.Debug("OnDrop. data: " + data);
    }

    public OnDragOver(e) {
        //this.log.Debug("OnDragOver");
        if (e.preventDefault) e.preventDefault();
        return false;
    }
}

export = DeviceManager