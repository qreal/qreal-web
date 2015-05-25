var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RangeSensor = (function (_super) {
    __extends(RangeSensor, _super);
    function RangeSensor() {
        _super.apply(this, arguments);
    }
    RangeSensor.parentType = ScalarSensor;
    RangeSensor.name = "sonar";
    RangeSensor.friendlyName = "Range sensor";
    return RangeSensor;
})(ScalarSensor);
//# sourceMappingURL=RangeSensor.js.map