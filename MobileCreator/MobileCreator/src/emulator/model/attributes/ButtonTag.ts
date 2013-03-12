import mTextViewTag = module("emulator/model/attributes/TextViewTag");

export class ButtonTag extends mTextViewTag.TextViewTag {

    //onclick
    private onClick: string;
    get OnClick() {
        return this.onClick;
    }
    set OnClick(value: string) {
        this.onClick = value;
    }

    constructor() {
        super();
    }
}