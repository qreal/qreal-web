import mImageViewTag = module("emulator/model/attributes/ImageViewTag");
import mControlTag = module("emulator/model/attributes/ControlTag");
import mControl = module("emulator/model/ui/Control");

export class ImageView extends mControl.Control {

    constructor(tag: mImageViewTag.ImageViewTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
        var $img = $("<img></img>")
        $img.attr('src', tag.ImageUrl);
        this.$Control.append($img);
        this.setDimensions($img);
        this.setDimensions();
    }

    public create() {
        super.create();  
    }
}