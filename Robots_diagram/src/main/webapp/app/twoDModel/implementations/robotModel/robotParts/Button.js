var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.parentType = ScalarSensor;
    Button.name = "button";
    Button.friendlyName = "Button";
    return Button;
})(ScalarSensor);
//# sourceMappingURL=Button.js.map