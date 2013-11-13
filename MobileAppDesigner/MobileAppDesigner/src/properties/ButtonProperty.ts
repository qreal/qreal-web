import Property = require("src/properties/Property");

class ButtonProperty extends Property {

    private id: string;
    private text: string;

    public get Id(): string {
        return this.id;
    }

    public set Id(value: string) {
        this.id = value;
    }

    public get Text(): string {
        return this.text;
    }

    public set Text(value: string) {
        this.text = value;
    }
}

export = ButtonProperty;