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
        switch (propertyType) {
            case Enums.PropertyType.Id:
                this.Properties.Id = newValue;
                this.Element.find('input').attr('id', newValue);
                break;
            case Enums.PropertyType.Title:               
                this.Element.find('label').text(newValue);               
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                //Not work
                //$('#' + propertyId).buttonMarkup({ mini: cond });
                break;
            case Enums.PropertyType.Theme:
                //Not work
                //$('#' + propertyId).textinput({ theme: newValue });
                break;
        }
    }
}

export = Input; 