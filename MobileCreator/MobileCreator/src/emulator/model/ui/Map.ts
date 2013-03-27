import mControl = module("emulator/model/ui/Control");
import mMapTag = module("emulator/model/attributes/MapTag");

export class Map extends mControl.Control {

    private url: string = "http://www.bing.com/maps/embed/viewer.aspx?v=3&cp=59.876984~29.839293&lvl=15&w=&mkt=en-us&src=SHELL&form=BMEMJS";

    constructor(tag: mMapTag.MapTag);
    constructor(tag: mMapTag.MapTag, $control: JQuery);
    constructor(tag: mMapTag.MapTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
        this.setDimensions($control);
        this.$Control.attr('src', this.url);
        $control.css('position', 'relative');

        var map = new Microsoft.Maps.Map($control.get()[0],
                           {
                               credentials: "AvJwCah4br6cge458C1Vc6NSyzZy2SfsqzBrTwUVmuybDrtrc6pV-qCP98ZkTqKW",
                               center: new Microsoft.Maps.Location(59.876984, 29.839293),
                               mapTypeId: Microsoft.Maps.MapTypeId.road,
                               zoom: 7
                           });
    }
}