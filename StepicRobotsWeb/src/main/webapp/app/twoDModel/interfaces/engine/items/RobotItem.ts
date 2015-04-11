interface RobotItem {
    ride(): void;
    hideHandles(): void;
    showHandles(): void;
    getWidth(): number;
    getHeight(): number;
    getStartPosition(): TwoDPosition;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo, pathToImage: string,
                  position?: TwoDPosition, direction?: number): void;
    setStartPosition(position: TwoDPosition, direction: number): void;
}