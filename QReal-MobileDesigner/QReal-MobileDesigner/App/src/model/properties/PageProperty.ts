import Property = require("src/model/properties/Property");
import ControlType = require("src/model/ControlType");
import PropertyType = require("src/model/PropertyType");

class PageProperty extends Property {    
    
    constructor(id: string) {
        super(ControlType.Page, id);
    }
}

export = PageProperty; 