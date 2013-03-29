import mControl = module("emulator/model/ui/Control");
import mMapTag = module("emulator/model/attributes/MapTag");
import mLog = module("utils/log/Log");

export class Map extends mControl.Control {

    private logger = new mLog.Logger("Map");

    private map: Microsoft.Maps.Map;

    get Map(): Microsoft.Maps.Map {
        return this.map
    }

    constructor(tag: mMapTag.MapTag);
    constructor(tag: mMapTag.MapTag, $control: JQuery);
    constructor(tag: mMapTag.MapTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
        this.setDimensions($control);
        $control.css('position', 'relative');

        this.map = new Microsoft.Maps.Map($control.get()[0],
                           {
                               credentials: "AvJwCah4br6cge458C1Vc6NSyzZy2SfsqzBrTwUVmuybDrtrc6pV-qCP98ZkTqKW",
                               center: new Microsoft.Maps.Location(59.876984, 29.839293),
                               mapTypeId: Microsoft.Maps.MapTypeId.road,
                               zoom: 8
                           });
    }

    public addPushpins(points: Point[]): void {
        this.map.entities.clear();
        points.map(point => this.addPushpin(point))
    }

    public addPushpin(point: Point) {
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(point.Latitude, point.Longitude), null);
        
        var map = this.map;
        (function (maps) {
            var pushpinClick = maps.Events.addHandler(pushpin, 'click', function () {
                var infoboxOptions = {
                    width: 200,
                    height: 100,
                    description: point.Description
                };
                var defaultInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(point.Latitude, point.Longitude), infoboxOptions);
                map.entities.push(defaultInfobox);
            });
        })(Microsoft.Maps);
        
        this.map.entities.push(pushpin);      
    }
}

export class Point {
    private latitude: number;
    private longitude: number;
    private description: string;

    get Latitude(): number{
        return this.latitude;
    }

    get Longitude(): number {
        return this.longitude;
    }

    get Description(): string {
        return this.description;
    }

    constructor(latitude: number, longitude: number, description:string) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    public toString(): string{
        return this.Latitude + ";" + this.Longitude + ";" + this.Description + ";";
    }
}
