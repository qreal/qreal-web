class TwoDRobotModelImpl extends CommonRobotModelImpl {
    private name: string;
    private image: string;
    private realModel: RobotModelInterface;

    constructor(realModel: RobotModelInterface, name: string) {
        super();
        this.realModel = realModel;
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