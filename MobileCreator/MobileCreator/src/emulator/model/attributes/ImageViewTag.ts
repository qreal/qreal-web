import mControlTag = module("emulator/model/attributes/ControlTag");

export class ImageViewTag extends mControlTag.ControlTag {

    // image url
    private url: string;
    get ImageUrl() { return this.url }
    set ImageUrl(value: string) { this.url = value }

    constructor() {
        super();
    }
}