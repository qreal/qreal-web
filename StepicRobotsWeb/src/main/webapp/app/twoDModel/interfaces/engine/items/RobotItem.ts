interface RobotItem extends AbstractItem {
    getWidth(): number;
    getHeight(): number;
    getStartPosition(): TwoDPosition;
    removeSensorItem(portName: string): void;
    addSensorItem(portName: string, deviceType: DeviceInfo, pathToImage: string,
                  position?: TwoDPosition, direction?: number): void;
    setStartPosition(position: TwoDPosition, direction: number): void;
    clearCurrentPosition(): void;
    hide(): void;
    show(): void;
    rotateSensors(angle: number, centerX: number, centerY: number): void;
    moveSensors(positionX: number, positionY: number): void;
    setOffsetX(offsetX: number): void;
    setOffsetY(offsetY: number): void;
    moveToPoint(x: number, y: number, rotation: number): void;
    setMarkerDown(down: boolean): void;
    setMarkerColor(color: string): void;
}