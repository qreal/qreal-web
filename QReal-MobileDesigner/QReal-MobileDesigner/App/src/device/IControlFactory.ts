interface IControlFactory {

    CreatePage(id: string): any;

    CreateButton(id: string): any;

    CreateInput(id: string): any;
}

export = IControlFactory;