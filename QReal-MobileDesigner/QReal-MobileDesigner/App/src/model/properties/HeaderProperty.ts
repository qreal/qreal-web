import Property = require("src/model/properties/Property");
import Enums = require("src/model/Enums");

class HeaderProperty extends Property {

    constructor(id: string) {
        super(Enums.ControlType.Header, id);
    }
}

export = HeaderProperty; 