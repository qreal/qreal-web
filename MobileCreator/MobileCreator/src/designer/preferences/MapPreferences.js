var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/preferences/ElementPreferences"], function(require, exports, __mElementPreferences__) {
    var mElementPreferences = __mElementPreferences__;

    var MapPreferences = (function (_super) {
        __extends(MapPreferences, _super);
        function MapPreferences() {
            _super.apply(this, arguments);

        }
        Object.defineProperty(MapPreferences.prototype, "MapId", {
            get: function () {
                return this.mapId;
            },
            set: function (mapId) {
                this.mapId = mapId;
            },
            enumerable: true,
            configurable: true
        });
        return MapPreferences;
    })(mElementPreferences.ElementPreferences);
    exports.MapPreferences = MapPreferences;    
})
