var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikSonarSensor = (function (_super) {
    __extends(TrikSonarSensor, _super);
    function TrikSonarSensor() {
        _super.apply(this, arguments);
    }
    TrikSonarSensor.parentType = RangeSensor;
    TrikSonarSensor.friendlyName = "Sonic Sensor";
    return TrikSonarSensor;
})(RangeSensor);
//# sourceMappingURL=TrikSonarSensor.js.map