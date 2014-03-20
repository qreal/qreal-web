import Enums = require("src/model/Enums");


class Property {

    private type: Enums.ControlType;

    public get Type(): Enums.ControlType {
        return this.type;
    }

    public set Type(value: Enums.ControlType) {
        this.type = value;
    }

    private id: string;

    public get Id(): string {
        return this.id;
    }

    public set Id(value: string) {
        this.id = value;
    }

    constructor(type: Enums.ControlType, id:string) {
        this.Type = type;
        this.Id = id;
    }
}

export = Property;