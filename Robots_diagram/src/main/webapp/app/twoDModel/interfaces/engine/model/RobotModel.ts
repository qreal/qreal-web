interface RobotModel {
    nextFragment(): void;
    setPosition(position: TwoDPosition): void;
    getPosition(): TwoDPosition;
}