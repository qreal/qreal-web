import Property = require("src/model/properties/Property");

class PageProperty extends Property {    
    
    constructor(id: string) {
        super(ControlType.Page, id);
    }
}

export = PageProperty; 