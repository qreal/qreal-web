import mControl = module("emulator/model/ui/Control");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mControlTag = module("emulator/model/attributes/ControlTag");

export class Button extends mControl.Control {

    constructor(tag: mButtonTag.ButtonTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
    }

    public create() {
        var $button = $("<a data-role='button'></a>");
        this.$Control.append($button);
        var tag = <mButtonTag.ButtonTag> this.Tag;
        if (tag.TextSize != 0) {
            //this.$Control.children('a').children('span').children('span').css('font-size', tag.TextSize);
            $button.css('font-size', tag.TextSize);
        }
        $button.text(tag.Text);
        this.$Control.trigger('create');
        super.create();
    }
}