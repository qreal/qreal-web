class TwoDRobotModelImpl implements TwoDRobotModel {
    private name: string;
    private image: string;

    constructor(name: string) {
        this.name = name;
        this.image = "images/2dmodel/trikTwoDRobot.svg"
    }

    getName(): string {
        return this.name;
    }

    getRobotImage(): string {
        return this.image;
    }
}