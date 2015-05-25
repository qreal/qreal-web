var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikGamepadButton = (function (_super) {
    __extends(TrikGamepadButton, _super);
    function TrikGamepadButton() {
        _super.apply(this, arguments);
    }
    TrikGamepadButton.parentType = Button;
    TrikGamepadButton.name = "gamepadButton";
    TrikGamepadButton.friendlyName = "Android Gamepad Button";
    return TrikGamepadButton;
})(Button);
//# sourceMappingURL=TrikGamepadButton.js.map