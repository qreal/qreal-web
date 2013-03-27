import mControl = module("emulator/model/ui/Control");
import mMapTag = module("emulator/model/attributes/MapTag");

export class Map extends mControl.Control {

    private url: string = "http://www.bing.com/maps/embed/viewer.aspx?v=3&cp=59.876984~29.839293&lvl=15&w=&mkt=en-us&src=SHELL&form=BMEMJS";

    constructor(tag: mMapTag.MapTag);
    constructor(tag: mMapTag.MapTag, $control: JQuery);
    constructor(tag: mMapTag.MapTag, $control?: JQuery = $("<iframe></iframe>")) {
        super(tag, $control);
        this.setDimensions($control);
        this.$Control.attr('src', this.url);
    }
}