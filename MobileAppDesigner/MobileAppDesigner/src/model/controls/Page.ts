import App = require("src/Application");
import Log = require("src/util/log/Log");
import PageProperty = require("src/model/properties/PageProperty");
import BaseControl = require("src/model/controls/BaseControl");
import BaseContainer = require("src/model/controls/BaseContainer");

class Page extends BaseContainer<PageProperty> {

    constructor(id: string) {
        super(new PageProperty(id));
        this.log = new Log("Page");
    }

    public OnDrop(event) {
        this.log.Debug("OnDrop, event: ", event);
        event.preventDefault();
        var controlId = event.originalEvent.dataTransfer.getData("Text");
        var control = App.Instance.Device.ControlManager.CreateControl(controlId);
        this.Childrens.push(control);
        this.Element.append(control.Element);
        //control.Element.trigger('create');
        $('#' + this.Properties.Id).trigger('create');
    }

    public OnDragOver(e) {
        //this.log.Debug("OnDragOver");
        e.preventDefault();
    }
}

export = Page; 