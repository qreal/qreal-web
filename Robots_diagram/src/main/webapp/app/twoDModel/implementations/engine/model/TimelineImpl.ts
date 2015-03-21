class TimelineImpl implements Timeline {
    private timeInterval: number = 10;
    private fps: number = 28;
    private defaultFrameLength: number = 1000 / this.fps;

    private slowSpeedFactor: number = 2;
    private normalSpeedFactor: number = 5;
    private fastSpeedFactor: number = 10;
    private immediateSpeedFactor: number = 100000000;

    private defaultRealTimeInterval: number = 0;
    private ticksPerCycle: number = 3;
    private speedFactor: number;
    private cyclesCount: number;
    private frameLength: number = this.defaultFrameLength;

    private intervalId: number;

    private robotModel: RobotModel;

    constructor(robotModel: RobotModel) {
        this.robotModel = robotModel;
    }

    start(): void {
        var timeline = this;
        this.intervalId = setInterval(function() { timeline.onTimer(timeline); }, this.defaultFrameLength);
    }

    stop(): void {
        clearInterval(this.intervalId);
    }

    onTimer(timeline: Timeline): void {
        timeline.getRobotModel().nextFragment();
    }

    setSpeedFactor(factor: number): void {
        this.speedFactor = factor;
    }

    getSpeedFactor(): number {
        return this.speedFactor;
    }

    getRobotModel(): RobotModel {
        return this.robotModel;
    }
}