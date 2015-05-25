var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Speaker = (function (_super) {
    __extends(Speaker, _super);
    function Speaker() {
        _super.apply(this, arguments);
    }
    Speaker.parentType = DeviceImpl;
    Speaker.name = "speaker";
    Speaker.friendlyName = "Speaker";
    return Speaker;
})(DeviceImpl);
//# sourceMappingURL=Speaker.js.map