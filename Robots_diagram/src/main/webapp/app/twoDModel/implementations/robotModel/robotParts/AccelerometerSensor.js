var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AccelerometerSensor = (function (_super) {
    __extends(AccelerometerSensor, _super);
    function AccelerometerSensor() {
        _super.apply(this, arguments);
    }
    AccelerometerSensor.parentType = ScalarSensor;
    AccelerometerSensor.name = "accelerometer";
    AccelerometerSensor.friendlyName = "Accelerometer";
    return AccelerometerSensor;
})(ScalarSensor);
//# sourceMappingURL=AccelerometerSensor.js.map