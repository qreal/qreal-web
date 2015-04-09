class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private sensorsConfiguration: SensorsConfiguration;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.sensorsConfiguration = new SensorsConfiguration(this);
    }

    info(): TwoDRobotModel {
        return this.twoDRobotModel;
    }

    removeSensorItem(portName: string): void {
        this.robotItem.removeSensorItem(portName);
    }

    getSensorsConfiguration(): SensorsConfiguration {
        return this.sensorsConfiguration;
    }

    addSensorItem(portName: string, deviceType: DeviceInfo): void {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType));
    }

    nextFragment(): void {
        this.robotItem.ride();
    }
}