class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;

    constructor() {
        this.robotItem = new RobotItemImpl();
    }

    nextFragment(): void {
        this.robotItem.ride();
    }
}