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
        this.setDimensions();
    }

    public setDimensions() {
        switch (this.Tag.Width) {
            case mControlTag.ControlTag.WrapContent:
                break;
            case mControlTag.ControlTag.MatchParrent:
                this.$Control.css("width", "inherit");
                break;
            default:
                this.$Control.css("width", this.Tag.Width + "px");
                break;
        }
        switch (this.Tag.Height) {
            case mControlTag.ControlTag.WrapContent:
                break;
            case mControlTag.ControlTag.MatchParrent:
                this.$Control.css("height", "inherit");
                break;
            default:
                this.$Control.css("height", this.Tag.Height + "px");
                break;
        }
    }
}