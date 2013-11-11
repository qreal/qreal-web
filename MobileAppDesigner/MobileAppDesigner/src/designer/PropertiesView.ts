import Log = require("src/util/log/Log");
import Controller = require("src/designer/Controller");
import EventManager = require("src/util/events/EventManager");

class PropertiesView {

    private log = new Log("PropertiesView");

    private controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    public Init(): void {
        this.log.Debug("Init");

        var self = this;
        this.controller.EventManager.AddSubscriber(EventManager.EventShowProperties, {
            OnEvent: (data) => {
                self.log.Debug("OnEvent");
                self.log.DebugObj(data);
                self.ShowProperty();
            }
        });
    }

    public ShowProperty(): void {
        $('#propertyTmpl').tmpl({ title: 'My property' }).appendTo('body');
        $("#dialog").dialog();
    }
}

export = PropertiesView;