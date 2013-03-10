import mControlTag = module("emulator/model/attributes/ControlTag");

export class WebViewTag extends mControlTag.ControlTag {

    // Text
    private url: string;
    get Url() { return this.url }
    set Url(value: string) { this.url = value }

    constructor() {
        super();
    }
}