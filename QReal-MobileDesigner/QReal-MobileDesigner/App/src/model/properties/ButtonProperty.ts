import Property = require("src/model/properties/Property");
import ControlType = require("src/model/ControlType");
import PropertyType = require("src/model/PropertyType");

class ButtonProperty extends Property {

    private text: string;
    private inline: boolean;
    private corners: boolean;
    private mini: boolean;
    private theme: string;

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

    public get Corners(): boolean {
        return this.corners;
    }

    public set Corners(value: boolean) {
        this.corners = value;
    }

    public get Mini(): boolean {
        return this.mini;
    }

    public set Mini(value: boolean) {
        this.mini = value;
    }

    public get Theme(): string {
        return this.theme;
    }

    public set Theme(value: string) {
        this.theme = value;
    }

    constructor(id: string) {
        super(ControlType.Button, id);
        this.Text = "Button";
        this.Inline = false;
        this.Corners = true;
        this.Mini = false;
        this.Theme = 'c';
    }

}

export = ButtonProperty;