import Log = require("src/util/log/Log");
import Property = require("src/model/properties/Property");
import BaseControl = require("src/model/controls/BaseControl");

class BaseContainer<T extends Property> extends BaseControl<T> {

    private childrens = new Array<BaseControl<Property>>();

    public get Childrens(): Array<BaseControl<Property>> {
        return this.childrens;
    }

    constructor(properties: T) {
        super(properties);
        this.log = new Log("BaseContainer");
    }

    public Create(): JQuery {
        this.log.Error("This method should not be used");
        return $("");
    }

    public CreateForDesigner(): JQuery {
        this.log.Error("This method should not be used");
        return $("");
    }

}

export = BaseContainer;