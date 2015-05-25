var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikMotionSensor = (function (_super) {
    __extends(TrikMotionSensor, _super);
    function TrikMotionSensor() {
        _super.apply(this, arguments);
    }
    TrikMotionSensor.parentType = ScalarSensor;
    TrikMotionSensor.name = "motion";
    TrikMotionSensor.friendlyName = "Motion Sensor";
    return TrikMotionSensor;
})(ScalarSensor);
//# sourceMappingURL=TrikMotionSensor.js.map