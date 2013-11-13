class Property {

    private type: string;

    public get Type(): string {
        return this.type;
    }

    public set Type(value: string) {
        this.type = value;
    }
}

export = Property;