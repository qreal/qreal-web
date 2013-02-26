export class ControlTag {

    private id: string;
    get Id() { return this.id }
    set Id(value: string) { this.id = value }

    private marginLeft: number;
    private marginTop: number;
    private marginRight: number;
    private marginBottom: number;
    get MarginLeft() { return this.marginLeft }

    constructor() {
    }
}