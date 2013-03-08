import mWidget = module("designer/model/Widget");

export class Form {
    private baseLayout: mWidget.Widget;
    private formName: string;
    private id: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.formName = name;
    }

    get Id() {
        return this.id;
    }

    get FormName() {
        return this.formName;
    }

    set FormName(name: string) {
        this.formName = name;
    }

    set BaseLayout(baseLayout: mWidget.Widget) {
        this.baseLayout = baseLayout;
    }

    get BaseLayout() {
        return this.baseLayout;
    }

    public toXML() {
        //STUB
        return "STUB!!!"
    }
}
