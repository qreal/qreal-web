import ControlProperty = require("src/model/ControlProperty");

interface IControlFactory {

    CreatePage(property: ControlProperty.PageProperty): any;

    CreateButton(property: ControlProperty.ButtonProperty): any;

    CreateInput(property: ControlProperty.InputProperty): any;
}

export = IControlFactory;