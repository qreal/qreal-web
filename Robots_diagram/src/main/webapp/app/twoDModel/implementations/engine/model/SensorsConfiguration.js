var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SensorsConfiguration = (function (_super) {
    __extends(SensorsConfiguration, _super);
    function SensorsConfiguration(robotModel) {
        _super.call(this);
        this.robotModel = robotModel;
        this.robotModelName = robotModel.info().getName();
    }
    SensorsConfiguration.prototype.isSensorHaveView = function (sensorType) {
        return sensorType.isA(TouchSensor) || sensorType.isA(ColorSensor) || sensorType.isA(LightSensor) || sensorType.isA(RangeSensor) || sensorType.isA(VectorSensor);
    };
    SensorsConfiguration.prototype.addSensor = function (portName, sensorType) {
        if (this.getCurrentConfiguration(this.robotModelName, portName)) {
            this.removeSensor(portName);
        }
        this.deviceConfigurationChanged(this.robotModel.info().getName(), portName, sensorType);
        if (this.isSensorHaveView(sensorType)) {
            this.robotModel.addSensorItem(portName, sensorType);
        }
    };
    SensorsConfiguration.prototype.removeSensor = function (portName) {
        var sensor = this.getCurrentConfiguration(this.robotModelName, portName);
        if (sensor) {
            if (this.isSensorHaveView(sensor)) {
                this.robotModel.removeSensorItem(portName);
            }
            this.deviceConfigurationChanged(this.robotModelName, portName, null);
        }
    };
    return SensorsConfiguration;
})(DevicesConfigurationProvider);
//# sourceMappingURL=SensorsConfiguration.js.map