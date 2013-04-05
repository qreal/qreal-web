var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mControl = require("./emulator/model/ui/Control")

var mLog = require("./utils/log/Log")
var Map = (function (_super) {
    __extends(Map, _super);
    function Map(tag, $control) {
        if (typeof $control === "undefined") { $control = $("<div></div>"); }
        _super.call(this, tag, $control);
        this.logger = new mLog.Logger("Map");
        this.setDimensions($control);
        $control.css('position', 'relative');
        this.map = new Microsoft.Maps.Map($control.get()[0], {
            credentials: "AvJwCah4br6cge458C1Vc6NSyzZy2SfsqzBrTwUVmuybDrtrc6pV-qCP98ZkTqKW",
            center: new Microsoft.Maps.Location(55.698099, 37.392397),
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 12
        });
    }
    Object.defineProperty(Map.prototype, "Map", {
        get: function () {
            return this.map;
        },
        enumerable: true,
        configurable: true
    });
    Map.prototype.addPushpins = function (points) {
        var _this = this;
        this.map.entities.clear();
        points.map(function (point) {
            return _this.addPushpin(point);
        });
    };
    Map.prototype.addPushpin = function (point) {
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
    };
    return Map;
})(mControl.Control);
exports.Map = Map;
var Point = (function () {
    function Point(latitude, longitude, description) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }
    Object.defineProperty(Point.prototype, "Latitude", {
        get: function () {
            return this.latitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "Longitude", {
        get: function () {
            return this.longitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "Description", {
        get: function () {
            return this.description;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.toString = function () {
        return this.Latitude + ";" + this.Longitude + ";" + this.Description + ";";
    };
    return Point;
})();
exports.Point = Point;
//@ sourceMappingURL=Map.js.map
