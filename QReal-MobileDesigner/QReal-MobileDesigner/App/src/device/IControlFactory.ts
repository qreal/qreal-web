import Property = require("src/model/properties/Property");
import PageProperty = require("src/model/properties/PageProperty");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import InputProperty = require("src/model/properties/InputProperty");

interface IControlFactory {

    CreatePage(property: PageProperty): any;

    CreateButton(property: ButtonProperty): any;

    CreateInput(property: InputProperty): any;
}

export = IControlFactory;