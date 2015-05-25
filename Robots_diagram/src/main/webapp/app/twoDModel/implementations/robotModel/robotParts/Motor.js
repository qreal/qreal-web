var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Motor = (function (_super) {
    __extends(Motor, _super);
    function Motor() {
        _super.apply(this, arguments);
    }
    Motor.parentType = DeviceImpl;
    Motor.name = "motor";
    Motor.friendlyName = "Motor";
    return Motor;
})(DeviceImpl);
//# sourceMappingURL=Motor.js.map