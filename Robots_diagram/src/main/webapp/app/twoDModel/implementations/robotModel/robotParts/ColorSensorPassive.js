var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColorSensorPassive = (function (_super) {
    __extends(ColorSensorPassive, _super);
    function ColorSensorPassive() {
        _super.apply(this, arguments);
    }
    ColorSensorPassive.parentType = ColorSensor;
    ColorSensorPassive.name = "colorNone";
    ColorSensorPassive.friendlyName = "Color sensor (passive)";
    return ColorSensorPassive;
})(ColorSensor);
//# sourceMappingURL=ColorSensorPassive.js.map