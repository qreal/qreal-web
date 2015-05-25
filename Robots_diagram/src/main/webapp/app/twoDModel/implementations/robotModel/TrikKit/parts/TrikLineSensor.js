var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikLineSensor = (function (_super) {
    __extends(TrikLineSensor, _super);
    function TrikLineSensor() {
        _super.apply(this, arguments);
    }
    TrikLineSensor.parentType = VectorSensor;
    TrikLineSensor.name = "trikLineSensor";
    TrikLineSensor.friendlyName = "Line Sensor";
    return TrikLineSensor;
})(VectorSensor);
//# sourceMappingURL=TrikLineSensor.js.map