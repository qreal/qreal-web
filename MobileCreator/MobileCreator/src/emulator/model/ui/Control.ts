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
        this.$Control.css({
            'text-align': tag.Gravity,
        });
        this.setMargins();
    }

    public create() {
    }

    public setDimensions();
    public setDimensions($element: JQuery);
    public setDimensions($element?: JQuery = this.$Control) {
        switch (this.Tag.Width) {
            case mControlTag.ControlTag.WrapContent:
                $element.css("width", "auto");
                break;
            case mControlTag.ControlTag.MatchParrent:
                $element.css("width", "100%");
                break;
            default:
                $element.css("width", this.Tag.Width + "px");
                break;
        }
        switch (this.Tag.Height) {
            case mControlTag.ControlTag.WrapContent:
                $element.css("height", "auto");
                break;
            case mControlTag.ControlTag.MatchParrent:
                $element.css("height", "100%");
                break;
            default:
                $element.css("height", this.Tag.Height + "px");
                break;
        }
    }

    public setMargins();
    public setMargins($element: JQuery);
    public setMargins($element?: JQuery = this.$Control) {

        $element.css({
            'margin-left': this.Tag.MarginLeft + 'px',
            'margin-right': this.Tag.MarginRight + 'px',
            'margin-top': this.Tag.MarginTop + 'px',
            'margin-bottom': this.Tag.MarginBottom + 'px'
        });
    }
}