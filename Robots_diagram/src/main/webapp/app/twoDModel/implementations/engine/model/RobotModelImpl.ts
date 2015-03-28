class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private position: TwoDPosition;

    constructor(paper: RaphaelPaper, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.position = position;
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(paper, twoDRobotModel.getRobotImage(), this);
    }

    nextFragment(): void {
        this.robotItem.ride();
    }

    setPosition(position: TwoDPosition): void {
        this.position = position;
    }

    getPosition(): TwoDPosition {
        return this.position;
    }
}