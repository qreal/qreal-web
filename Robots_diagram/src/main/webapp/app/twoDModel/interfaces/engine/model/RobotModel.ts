interface RobotModel {
    info(): TwoDRobotModel;
    nextFragment(): void;
    removeSensorItem(portName: string): void;
    addSonarSensorItem(portName: string): void;
}