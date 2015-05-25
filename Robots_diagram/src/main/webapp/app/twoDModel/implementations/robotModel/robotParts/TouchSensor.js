var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TouchSensor = (function (_super) {
    __extends(TouchSensor, _super);
    function TouchSensor() {
        _super.apply(this, arguments);
    }
    TouchSensor.parentType = ScalarSensor;
    TouchSensor.name = "touch";
    TouchSensor.friendlyName = "Touch sensor";
    return TouchSensor;
})(ScalarSensor);
//# sourceMappingURL=TouchSensor.js.map