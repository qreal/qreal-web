var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Display = (function (_super) {
    __extends(Display, _super);
    function Display() {
        _super.apply(this, arguments);
    }
    Display.parentType = DeviceImpl;
    Display.name = "display";
    Display.friendlyName = "Display";
    return Display;
})(DeviceImpl);
//# sourceMappingURL=Display.js.map