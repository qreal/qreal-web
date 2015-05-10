interface RobotModel {
    info(): TwoDRobotModel;
    nextFragment(): void;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo, position?: TwoDPosition, direction?: number): void;
    getSensorsConfiguration(): SensorsConfiguration;
    deserialize(xml, offsetX: number, offsetY: number): void;
    rideTrace(traceJson);
    stopPlay(): void;
}