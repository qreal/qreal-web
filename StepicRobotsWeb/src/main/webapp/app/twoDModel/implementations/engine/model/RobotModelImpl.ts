class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private sensorsConfiguration: SensorsConfiguration;
    private worldModel: WorldModel;
    private displayWidget: DisplayWidget;
    private runner: Runner;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.worldModel = worldModel;
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.robotItem.hide();
        this.sensorsConfiguration = new SensorsConfiguration(this);
        this.displayWidget = new DisplayWidget();
        this.runner = new Runner();
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

    addSensorItem(portName: string, deviceType: DeviceInfo, position?: TwoDPosition, direction?: number): void {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType),
            position, direction);
    }

    private parsePositionString(positionStr: string): TwoDPosition {
        var splittedStr = positionStr.split(":");
        var x = parseFloat(splittedStr[0]);
        var y = parseFloat(splittedStr[1]);
        return new TwoDPosition(x, y);
    }

    deserialize(xml, offsetX: number, offsetY: number): void {
        var posString = xml.getAttribute('position');
        var pos = this.parsePositionString(posString);
        pos.x += offsetX;
        pos.y += offsetY;
        var direction = parseFloat(xml.getAttribute('direction'));
        this.robotItem.setStartPosition(pos, direction);
        this.robotItem.setOffsetX(offsetX);
        this.robotItem.setOffsetY(offsetY);

        this.sensorsConfiguration.deserialize(xml);

        this.robotItem.show();
    }

    showCheckResult(result) {
        this.stopPlay();
        this.runner.run(this.robotItem, this.displayWidget, result);
    }

    stopPlay(): void {
        this.runner.stop(this.robotItem, this.displayWidget);
        this.robotItem.clearCurrentPosition();
    }

    closeDisplay(): void {
        this.displayWidget.hide();
    }

    showDisplay(): void {
        this.displayWidget.show();
    }
}