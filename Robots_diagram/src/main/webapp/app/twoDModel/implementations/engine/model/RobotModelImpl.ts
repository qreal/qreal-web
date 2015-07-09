class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private sensorsConfiguration: SensorsConfiguration;
    private position: TwoDPosition;
    private angle: number;
    private speed1: number;
    private speed2: number;
    private maxSpeed1 = 3;
    private maxSpeed2 = 3;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.sensorsConfiguration = new SensorsConfiguration(this);

        this.position = new TwoDPosition(position.x, position.y);
        this.angle = 0;
        this.speed1 = 0;
        this.speed2 = 0;
        this.robotItem.updateRobotLocation(position, this.angle);
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

    setMotor1(power) {
        this.speed1 = this.maxSpeed1 * power / 100;
    }

    setMotor2(power) {
        this.speed2 = this.maxSpeed2 * power / 100;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    getAngle(): number {
        return this.angle;
    }

    setPosition(position: TwoDPosition) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    recalculateParams(): void {
        var position = this.robotItem.getCurrentPosition();
        var angle = this.robotItem.getAngle();
        this.position = position;
        this.angle = angle;
        var robotHeight = 50; // TODO: getHeight!
        var timeInterval = 1; // TODO: timeInterval!
        var averageSpeed = (this.speed1 + this.speed2) / 2;
        if (this.speed1 != this.speed2) {
            var radius = this.speed1 * robotHeight / (this.speed1 - this.speed2);
            var averageRadius = radius - robotHeight / 2;
            var angularSpeed = 0;
            var actualRadius = 0;
            if (this.speed1 == -this.speed2) {
                angularSpeed = this.speed1 / radius;
                actualRadius = 0;  // Radius is relative to the center of the robot.
            } else {
                angularSpeed = averageSpeed / averageRadius;
                actualRadius = averageRadius;
            }
            var gammaRadians = timeInterval * angularSpeed;
            var gammaDegrees = gammaRadians * 180 / Math.PI;

            //QTransform map;
            //map.rotate(robotAngle);
            ///// @todo robotWidth / 2 shall actually be a distance between robot center and
            ///// centers of the wheels by x axis.
            //map.translate(-robotWidth / 2, actualRadius);
            //map.rotate(gammaDegrees);
            //map.translate(robotWidth / 2, -actualRadius);

            //mPositionShift = QVector2D(map.map(QPointF(0, 0)));
            //mRotation = gammaDegrees;
            this.angle += gammaRadians;

            this.position.x += averageSpeed * Math.cos(this.angle);
            this.position.y += averageSpeed * Math.sin(this.angle);
        }
        else {
            this.position.x += averageSpeed * Math.cos(this.angle);
            this.position.y += averageSpeed * Math.sin(this.angle);
        }
        this.robotItem.updateRobotLocation(this.position, this.angle);
        console.log("Robot now at: " + this.position.x + ", " + this.position.y + '\n');
    }

    nextFragment(): void {
        this.robotItem.redraw();
    }

    //nextFragment(): void {
    //    this.robotItem.ride();
    //}
}