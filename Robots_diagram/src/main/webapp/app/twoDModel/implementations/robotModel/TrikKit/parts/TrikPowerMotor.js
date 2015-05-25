var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikPowerMotor = (function (_super) {
    __extends(TrikPowerMotor, _super);
    function TrikPowerMotor() {
        _super.apply(this, arguments);
    }
    TrikPowerMotor.parentType = Motor;
    TrikPowerMotor.name = "power";
    TrikPowerMotor.friendlyName = "Power Motor";
    return TrikPowerMotor;
})(Motor);
//# sourceMappingURL=TrikPowerMotor.js.map