import Property = require("src/properties/Property");

class ButtonProperty extends Property {

    private id: string;
    private text: string;
    private inline: boolean;

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

    public get Inline(): boolean {
        return this.inline;
    }

    public set Inline(value: boolean) {
        this.inline = value;
    }

    constructor();
    constructor(id: string)
    constructor(id?: string) {
        super(Property.TypeButton);
        this.Id = id || "id";
        this.Text = "Button";
        this.Inline = false;
    }

}

export = ButtonProperty;