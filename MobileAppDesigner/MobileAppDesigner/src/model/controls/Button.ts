import App = require("src/Application");
import Log = require("src/util/log/Log");
import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import BaseControl = require("src/model/controls/BaseControl");

class Button extends BaseControl<ButtonProperty> {

    constructor(id:string) {
        super(new ButtonProperty(id));
        this.log = new Log("Button");
    }

}   

export = Button;