class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
    }

    info(): TwoDRobotModel {
        return this.twoDRobotModel;
    }

    removeSensorItem(portName: string): void {
        this.robotItem.removeSensorItem(portName);
    }

    addSensorItem(portName: string, deviceType: DeviceInfo): void {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType));
    }

    nextFragment(): void {
        this.robotItem.ride();
    }
}