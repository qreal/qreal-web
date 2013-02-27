import mControlTag = module("emulator/model/attributes/ControlTag");

export class TextViewTag extends mControlTag.ControlTag {

    // Text
    private text: string;
    get Text() { return this.text }
    set Text(value: string) { this.text = value }

    constructor() {
        super();
    }
}