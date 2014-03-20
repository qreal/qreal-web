import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import InputProperty = require("src/model/properties/InputProperty");
import BaseControl = require("src/model/controls/BaseControl");

class Input extends BaseControl<InputProperty> {

    constructor(id: string) {
        super(new InputProperty(id));
        this.log = new Log("Input");
    }


    public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
    }
}

export = Input; 