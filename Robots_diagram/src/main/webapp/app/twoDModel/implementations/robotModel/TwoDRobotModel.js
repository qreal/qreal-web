var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TwoDRobotModel = (function (_super) {
    __extends(TwoDRobotModel, _super);
    function TwoDRobotModel(realModel, name) {
        _super.call(this);
        var twoDRobotModel = this;
        this.realModel = realModel;
        this.name = name;
        this.image = "images/2dmodel/trikKit/trikTwoDRobot.svg";
        realModel.getAvailablePorts().forEach(function (port) {
            twoDRobotModel.addAllowedConnection(port, realModel.getAllowedDevices(port));
        });
    }
    TwoDRobotModel.prototype.sensorImagePath = function (deviceType) {
        if (deviceType.isA(LightSensor)) {
            return "images/2dmodel/trikKit/twoDColorEmpty.svg";
        }
        else if (deviceType.isA(TrikInfraredSensor)) {
            return "images/2dmodel/trikKit/twoDIrRangeSensor.svg";
        }
        else if (deviceType.isA(TrikSonarSensor)) {
            return "images/2dmodel/trikKit/twoDUsRangeSensor.svg";
        }
        else if (deviceType.isA(TrikLineSensor)) {
            return "images/2dmodel/trikKit/twoDVideoModule.svg";
        }
        return null;
    };
    TwoDRobotModel.prototype.getName = function () {
        return this.name;
    };
    TwoDRobotModel.prototype.getRobotImage = function () {
        return this.image;
    };
    TwoDRobotModel.prototype.getConfigurablePorts = function () {
        return this.realModel.getConfigurablePorts();
    };
    return TwoDRobotModel;
})(CommonRobotModelImpl);
//# sourceMappingURL=TwoDRobotModel.js.map