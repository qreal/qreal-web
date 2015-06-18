class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private sensorsConfiguration: SensorsConfiguration;
    private worldModel: WorldModel;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.worldModel = worldModel;
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.robotItem.hide();
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

    addSensorItem(portName: string, deviceType: DeviceInfo, position?: TwoDPosition, direction?: number): void {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType),
            position, direction);
    }

    nextFragment(): void {
        this.robotItem.ride();
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

        var startPosition = xml.getElementsByTagName("startPosition")[0];
        if (startPosition) {
            var x = parseFloat(startPosition.getAttribute('x'));
            var y = parseFloat(startPosition.getAttribute('y'));
            var direction = parseFloat(startPosition.getAttribute('direction'));
            this.robotItem.setStartPositionCross(x, y, direction);
        }

        this.robotItem.show();
    }

    showCheckResult(result) {
        this.robotItem.showCheckResult(result);
    }

    stopPlay(): void {
        this.robotItem.clearCurrentPosition();
    }
}