var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColorSensor = (function (_super) {
    __extends(ColorSensor, _super);
    function ColorSensor() {
        _super.apply(this, arguments);
    }
    ColorSensor.parentType = ScalarSensor;
    ColorSensor.name = "color";
    ColorSensor.friendlyName = "Color sensor";
    return ColorSensor;
})(ScalarSensor);
//# sourceMappingURL=ColorSensor.js.map