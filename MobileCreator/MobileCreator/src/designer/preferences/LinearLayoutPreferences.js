var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/preferences/ElementPreferences"], function(require, exports, __mElementPreferences__) {
    var mElementPreferences = __mElementPreferences__;

    var LinearLayoutPreferences = (function (_super) {
        __extends(LinearLayoutPreferences, _super);
        function LinearLayoutPreferences() {
            _super.apply(this, arguments);

        }
        LinearLayoutPreferences.Vertical = 0;
        LinearLayoutPreferences.Horizontal = 1;
        Object.defineProperty(LinearLayoutPreferences.prototype, "Orientation", {
            get: function () {
                return this.orientation;
            },
            set: function (orientation) {
                this.orientation = orientation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutPreferences.prototype, "Background", {
            get: function () {
                return this.background;
            },
            set: function (background) {
                this.background = background;
            },
            enumerable: true,
            configurable: true
        });
        return LinearLayoutPreferences;
    })(mElementPreferences.ElementPreferences);
    exports.LinearLayoutPreferences = LinearLayoutPreferences;    
})
