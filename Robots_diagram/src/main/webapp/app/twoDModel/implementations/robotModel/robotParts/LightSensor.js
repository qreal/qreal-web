var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LightSensor = (function (_super) {
    __extends(LightSensor, _super);
    function LightSensor() {
        _super.apply(this, arguments);
    }
    LightSensor.parentType = ScalarSensor;
    LightSensor.name = "light";
    LightSensor.friendlyName = "Light sensor";
    return LightSensor;
})(ScalarSensor);
//# sourceMappingURL=LightSensor.js.map