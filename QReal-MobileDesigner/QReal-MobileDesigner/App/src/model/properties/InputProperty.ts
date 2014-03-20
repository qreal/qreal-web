import Property = require("src/model/properties/Property");
import Enums = require("src/model/Enums");

class InputProperty extends Property {

    private title: string;
    private inline: boolean;
    private corners: boolean;
    private mini: boolean;
    private theme: string;
    private placeholder: string;
    private name: string;

    public get Title(): string {
        return this.title;
    }

    public set Title(value: string) {
        this.title = value;
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

    public get Placeholder(): string {
        return this.placeholder;
    }

    public set Placeholder(value: string) {
        this.placeholder = value;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value;
    }

    constructor(id: string) {
        super(Enums.ControlType.Input, id);
        this.Title = "Title";
        this.Inline = false;
        this.Corners = true;
        this.Mini = false;
        this.Theme = 'c';
        this.Placeholder = '';
        this.Name = '';
    }
}

export = InputProperty;