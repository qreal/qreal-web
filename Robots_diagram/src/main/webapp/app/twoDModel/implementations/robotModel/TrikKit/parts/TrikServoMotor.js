var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikServoMotor = (function (_super) {
    __extends(TrikServoMotor, _super);
    function TrikServoMotor() {
        _super.apply(this, arguments);
    }
    TrikServoMotor.parentType = Motor;
    TrikServoMotor.name = "servo";
    TrikServoMotor.friendlyName = "Servo Motor";
    return TrikServoMotor;
})(Motor);
//# sourceMappingURL=TrikServoMotor.js.map