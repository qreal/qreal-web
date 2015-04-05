interface RobotItem {
    ride(): void;
    hideHandles(): void;
    showHandles(): void;
    removeSensorItem(portName: string): void;
    addSonarSensorItem(portName: string): void;
}