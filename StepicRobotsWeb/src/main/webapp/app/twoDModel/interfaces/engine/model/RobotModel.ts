interface RobotModel {
    info(): TwoDRobotModel;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo, position?: TwoDPosition, direction?: number): void;
    getSensorsConfiguration(): SensorsConfiguration;
    deserialize(xml, offsetX: number, offsetY: number): void;
    showCheckResult(result);
    stopPlay(): void;
    closeDisplay(): void;
    showDisplay(): void;
    follow(value: boolean): void;
}