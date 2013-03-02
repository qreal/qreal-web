/// <reference path="../../../../lib/jquery.d.ts" />
/// <reference path="../../../../lib/jquerymobile.d.ts" />
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Control {

    private $control: JQuery;
    get $Control() { return this.$control; }
    set $Control(value: JQuery) { this.$control = value; }

    // Tag with control data
    private tag: mControlTag.ControlTag;
    get Tag() { return this.tag; }
    set Tag(value: mControlTag.ControlTag) { this.tag = value; }

    constructor(tag: mControlTag.ControlTag, $control: JQuery) {
        this.$Control = $control;
        this.Tag = tag;
        this.$Control.attr('id', tag.Id);
    }

    public create() {
    }
}