interface IControlFactory {

    CreatePage(id: string): any;

    CreateButton(id: string): any;
}

export = IControlFactory;