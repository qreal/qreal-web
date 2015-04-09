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

    private parsePositionString(positionStr: string): TwoDPosition {
        var regExp = /(-?\d+):(-?\d+)/gi;
        regExp.exec(positionStr);
        var x = parseFloat(RegExp.$1);
        var y = parseFloat(RegExp.$2);
        return new TwoDPosition(x, y);
    }

    deserialize(xml, offsetX: number, offsetY: number): void {
        var posString = xml.getAttribute('position');
        var pos = this.parsePositionString(posString);
        pos.x += offsetX;
        pos.y += offsetY;
        var direction = parseFloat(xml.getAttribute('direction'));
        this.robotItem.setStartPosition(pos, direction);

        var sensors = xml.getElementsByTagName("sensor");
        for (var j = 0; j < sensors.length; j++) {
            var posString = sensors[j].getAttribute('position');
            var pos = this.parsePositionString(posString);
            //TODO: set sensor
        }

        var startPosition = xml.getElementsByTagName("startPosition")[0];
        var x = parseFloat(startPosition.getAttribute('x'));
        var y = parseFloat(startPosition.getAttribute('y'));
        //TODO: set start pos
    }
}