class SensorsConfiguration {
    private robotModel: RobotModel;
    private sensors: {string?: DeviceInfo} = {};

    constructor(robotModel: RobotModel) {
        this.robotModel = robotModel;
    }

    private isSensorHaveView(sensorType: DeviceInfo): boolean {
        return sensorType.isA(TouchSensor)
            || sensorType.isA(ColorSensor)
            || sensorType.isA(LightSensor)
            || sensorType.isA(RangeSensor)
            || sensorType.isA(VectorSensor);
    }

    addSensor(portName: string, sensorType: DeviceInfo): void {
        if (this.sensors[portName]) {
            this.removeSensor(portName);
        }
        this.sensors[portName] = sensorType;
        if (this.isSensorHaveView(sensorType)) {
            this.robotModel.addSensorItem(portName, sensorType);
        }
    }

    removeSensor(portName: string): void {
        var sensor = this.sensors[portName];
        if (sensor) {
            if (this.isSensorHaveView(this.sensors[portName])) {
                this.robotModel.removeSensorItem(portName);
            }
            delete this.sensors[portName];
        }
    }
}