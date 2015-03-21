interface Timeline {
    start(): void;
    stop(): void;
    setSpeedFactor(factor: number): void;
    getSpeedFactor(): number;
    getRobotModel(): RobotModel;
}