var RobotModelImpl = (function () {
    function RobotModelImpl(worldModel, twoDRobotModel, position) {
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.sensorsConfiguration = new SensorsConfiguration(this);
    }
    RobotModelImpl.prototype.info = function () {
        return this.twoDRobotModel;
    };
    RobotModelImpl.prototype.removeSensorItem = function (portName) {
        this.robotItem.removeSensorItem(portName);
    };
    RobotModelImpl.prototype.getSensorsConfiguration = function () {
        return this.sensorsConfiguration;
    };
    RobotModelImpl.prototype.addSensorItem = function (portName, deviceType) {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType));
    };
    RobotModelImpl.prototype.nextFragment = function () {
        this.robotItem.ride();
    };
    return RobotModelImpl;
})();
//# sourceMappingURL=RobotModelImpl.js.map