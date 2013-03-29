var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control", "utils/log/Log"], function(require, exports, __mControl__, __mLog__) {
    var mControl = __mControl__;

    
    var mLog = __mLog__;

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
                center: new Microsoft.Maps.Location(59.876984, 29.839293),
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: 8
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
            points.map(function (point) {
                return _this.addPushpin(point);
            });
        };
        Map.prototype.addPushpin = function (point) {
            var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(point.Latitude, point.Longitude), null);
            var map = this.map;
            (function (maps) {
                var pushpinClick = maps.Events.addHandler(pushpin, 'click', function () {
                    alert(point.Coment);
                });
            })(Microsoft.Maps);
            this.map.entities.push(pushpin);
        };
        return Map;
    })(mControl.Control);
    exports.Map = Map;    
    var Point = (function () {
        function Point(latitude, longitude, comment) {
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Coment = comment;
        }
        Point.prototype.toString = function () {
            return this.Latitude + ";" + this.Longitude + ";" + this.Coment + ";";
        };
        return Point;
    })();
    exports.Point = Point;    
})
//@ sourceMappingURL=Map.js.map
