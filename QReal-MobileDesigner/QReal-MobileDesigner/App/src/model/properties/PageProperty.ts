import Property = require("src/model/properties/Property");
import Enums = require("src/model/Enums");

class PageProperty extends Property {    
    
    constructor(id: string) {
        super(Enums.ControlType.Page, id);
    }
}

export = PageProperty; 