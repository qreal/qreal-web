var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EncoderSensor = (function (_super) {
    __extends(EncoderSensor, _super);
    function EncoderSensor() {
        _super.apply(this, arguments);
    }
    EncoderSensor.parentType = ScalarSensor;
    EncoderSensor.name = "encoder";
    EncoderSensor.friendlyName = "Encoder";
    return EncoderSensor;
})(ScalarSensor);
//# sourceMappingURL=EncoderSensor.js.map