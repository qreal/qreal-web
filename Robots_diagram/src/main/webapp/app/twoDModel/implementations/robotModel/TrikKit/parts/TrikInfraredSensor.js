var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikInfraredSensor = (function (_super) {
    __extends(TrikInfraredSensor, _super);
    function TrikInfraredSensor() {
        _super.apply(this, arguments);
    }
    TrikInfraredSensor.parentType = RangeSensor;
    TrikInfraredSensor.name = "infrared";
    TrikInfraredSensor.friendlyName = "Infrared Sensor";
    return TrikInfraredSensor;
})(RangeSensor);
//# sourceMappingURL=TrikInfraredSensor.js.map