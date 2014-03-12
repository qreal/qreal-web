import Log = require("src/util/log/Log");
import PageProperty = require("src/model/properties/PageProperty");
import BaseControl = require("src/model/controls/BaseControl");
import BaseContainer = require("src/model/controls/BaseContainer");

class Page extends BaseContainer<PageProperty> {

    constructor(id: string) {
        super(new PageProperty(id));
        this.log = new Log("Page");
    }
}

export = BaseContainer; 