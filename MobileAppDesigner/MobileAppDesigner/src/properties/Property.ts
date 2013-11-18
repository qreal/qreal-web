class Property {

    public static TypeButton = "Button";

    private type: string;

    public get Type(): string {
        return this.type;
    }

    public set Type(value: string) {
        this.type = value;
    }

    constructor(type: string) {
        this.Type = type;
    }
}

export = Property;