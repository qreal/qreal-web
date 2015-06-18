interface RobotItem extends AbstractItem {
    ride(): void;
    getWidth(): number;
    getHeight(): number;
    getStartPosition(): TwoDPosition;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo, pathToImage: string,
                  position?: TwoDPosition, direction?: number): void;
    setStartPosition(position: TwoDPosition, direction: number): void;
    showCheckResult(result);
    clearCurrentPosition(): void;
    hide(): void;
    show(): void;
    setOffsetX(offsetX: number): void;
    setOffsetY(offsetY: number): void;
    setStartPositionCross(x: number, y: number, direction: number): void;
}