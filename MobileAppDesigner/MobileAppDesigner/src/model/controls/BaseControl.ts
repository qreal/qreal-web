import Log = require("src/util/log/Log");
import Property = require("src/model/properties/Property");

class BaseControl<T extends Property> {

    public log = new Log("BaseControl");

    private properties: T;


    public get Properties(): T {
        return this.properties
    }

    private element: JQuery;
    public get Element(): JQuery {
        return this.element;
    }

    public set Element(value: JQuery) {
        this.element = value;
    }

    constructor(properties: T) {
        this.properties = properties;
    }
}  

export = BaseControl;