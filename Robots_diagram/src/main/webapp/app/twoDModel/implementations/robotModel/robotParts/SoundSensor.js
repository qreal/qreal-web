var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SoundSensor = (function (_super) {
    __extends(SoundSensor, _super);
    function SoundSensor() {
        _super.apply(this, arguments);
    }
    SoundSensor.parentType = ScalarSensor;
    SoundSensor.name = "sound";
    SoundSensor.friendlyName = "Sound sensor";
    return SoundSensor;
})(ScalarSensor);
//# sourceMappingURL=SoundSensor.js.map