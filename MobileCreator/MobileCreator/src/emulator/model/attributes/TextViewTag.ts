import mControlTag = module("emulator/model/attributes/ControlTag");

export class TextViewTag extends mControlTag.ControlTag {

    // Text
    private text: string;
    get Text() { return this.text }
    set Text(value: string) { this.text = value }

    // TextSize
    private textSize: number = 0;
    get TextSize() { return this.textSize }
    set TextSize(value: number) { this.textSize = value }

    constructor() {
        super();
    }
}