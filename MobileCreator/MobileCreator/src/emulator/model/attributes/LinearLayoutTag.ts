import mControlPanelTag = module("emulator/model/attributes/ControlPanelTag");

export class LinearLayoutTag extends mControlPanelTag.ControlPanelTag {

    //Orientation
    public static Horizontal: number = 1;
    public static Vertical: number = 2;
    private orientation: number = LinearLayoutTag.Horizontal;
    get Orientation() { return this.orientation }
    set Orientation(value: number) { this.orientation = value }

    constructor() {
        super();
    }
}