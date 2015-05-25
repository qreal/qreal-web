var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikGamepadWheel = (function (_super) {
    __extends(TrikGamepadWheel, _super);
    function TrikGamepadWheel() {
        _super.apply(this, arguments);
    }
    TrikGamepadWheel.parentType = ScalarSensor;
    TrikGamepadWheel.name = "gamepadWheel";
    TrikGamepadWheel.friendlyName = "Android Gamepad Wheel";
    return TrikGamepadWheel;
})(ScalarSensor);
//# sourceMappingURL=TrikGamepadWheel.js.map