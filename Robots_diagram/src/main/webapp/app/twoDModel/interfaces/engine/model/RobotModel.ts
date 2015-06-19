interface RobotModel {
    info(): TwoDRobotModel;
    nextFragment(): void;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo): void;
    getSensorsConfiguration(): SensorsConfiguration;
}