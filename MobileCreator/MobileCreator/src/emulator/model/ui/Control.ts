/// <reference path="../../../../lib/jquery.d.ts" />
/// <reference path="../../../../lib/jquerymobile.d.ts" />
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Control {

    private elementJQuery: JQuery;
    get ElementJQuery() { return this.elementJQuery; }
    set ElementJQuery(value: JQuery) { this.elementJQuery = value; }

    // Tag with control data
    private tag: mControlTag.ControlTag;
    get Tag() { return this.tag; }
    set Tag(value: mControlTag.ControlTag) { this.tag = value; }

    constructor(tag: mControlTag.ControlTag, elementJQuery: JQuery) {
        this.ElementJQuery = elementJQuery;
        this.Tag = tag;
        this.ElementJQuery.attr('id', tag.Id);
    }

    public create() {
    }
}