var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GyroscopeSensor = (function (_super) {
    __extends(GyroscopeSensor, _super);
    function GyroscopeSensor() {
        _super.apply(this, arguments);
    }
    GyroscopeSensor.parentType = ScalarSensor;
    GyroscopeSensor.name = "gyroscope";
    GyroscopeSensor.friendlyName = "Gyroscope";
    return GyroscopeSensor;
})(ScalarSensor);
//# sourceMappingURL=GyroscopeSensor.js.map