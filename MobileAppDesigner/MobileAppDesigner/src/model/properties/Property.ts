class Property {

    private type: ControlType;

    public get Type(): ControlType {
        return this.type;
    }

    public set Type(value: ControlType) {
        this.type = value;
    }

    private id: string;

    public get Id(): string {
        return this.id;
    }

    public set Id(value: string) {
        this.id = value;
    }

    constructor(type: ControlType, id:string) {
        this.Type = type;
        this.Id = id;
    }
}

export = Property;