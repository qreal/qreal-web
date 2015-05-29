interface RobotItem extends AbstractItem {
    redraw(): void;
    updateRobotLocation(position: TwoDPosition, angle: number): void;
    getWidth(): number;
    getHeight(): number;
    getStartPosition(): TwoDPosition;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo, pathToImage: string): void;
    setStartPosition(position: TwoDPosition, direction: number): void;
}