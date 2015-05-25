var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractSensor = (function (_super) {
    __extends(AbstractSensor, _super);
    function AbstractSensor() {
        _super.apply(this, arguments);
    }
    AbstractSensor.parentType = DeviceImpl;
    return AbstractSensor;
})(DeviceImpl);
//# sourceMappingURL=AbstractSensor.js.map