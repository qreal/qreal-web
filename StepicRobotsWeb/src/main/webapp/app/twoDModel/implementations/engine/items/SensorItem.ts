class SensorItem {
    protected robotItem: RobotItem;
    protected worldModel: WorldModel;
    protected image: RaphaelElement;
    protected width: number;
    protected height: number;
    protected rotateHandle: RaphaelElement;
    protected centerX: number;
    protected centerY: number;
    protected startCx: number;
    protected startCy: number;
    protected startPosition: TwoDPosition;
    protected startDirection: number;
    protected sensorType: DeviceInfo;
    protected currentTranslation: string;
    protected currentRotation: string;
    protected currentRobotRotation: string;
    protected offsetPosition: TwoDPosition;

    constructor(robotItem: RobotItem, worldModel: WorldModel, sensorType: DeviceInfo,
                pathToImage: string, position?: TwoDPosition) {
        this.robotItem = robotItem;
        this.worldModel = worldModel;
        var paper: RaphaelPaper = worldModel.getPaper();
        this.sensorType = sensorType;
        this.defineImageSizes(sensorType);
        this.startPosition = this.getStartPosition(position);
        this.startDirection = 0;

        this.currentTranslation = "t0,0";
        this.currentRobotRotation = "R0"
        this.currentRotation = "r0";

        this.image = paper.image((pathToImage) ? pathToImage : this.pathToImage(),
            this.startPosition.x, this.startPosition.y, this.width, this.height);

        this.centerX = this.startPosition.x + this.width / 2;
        this.centerY = this.startPosition.y + this.height / 2;

        this.startCx = this.centerX;
        this.startCy = this.centerY;

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotateHandle = paper.circle(this.startPosition.x + this.width + 20,
            this.startPosition.y + this.height / 2, handleRadius).attr(handleAttrs);
        this.hideHandles();
    }

    setStartDirection(direction: number) {
        this.startDirection = direction;
        this.rotate(direction);
    }

    setStartPosition() {
        this.currentTranslation = "t0,0";
        this.currentRobotRotation = "R0"
        this.currentRotation = "r0";
        this.image.attr({x: this.startPosition.x, y: this.startPosition.y});
        this.centerX = this.startPosition.x + this.width / 2;
        this.centerY = this.startPosition.y + this.height / 2;
        this.startCx = this.centerX;
        this.startCy = this.centerY;
        this.rotateHandle.attr({"cx": + this.startPosition.x + this.width + 20, "cy": this.startPosition.y + this.height / 2 });
        this.image.transform("");
    }

    restoreStartDirection() {
        this.rotate(this.startDirection);
    }

    getStartPosition(position: TwoDPosition): TwoDPosition {
        var startX = this.robotItem.getStartPosition().x;
        var startY = this.robotItem.getStartPosition().y;
        if (position) {
            startX += position.x - this.width / 2;
            startY += position.y - this.height / 2;
            this.offsetPosition = new TwoDPosition(position.x - this.width / 2, position.y - this.height / 2);
        } else {
            startX = startX + this.robotItem.getWidth() + 15;
            startY = startY + this.robotItem.getHeight() / 2 - this.height / 2;
            this.offsetPosition = new TwoDPosition(this.robotItem.getWidth() + 15,
                this.robotItem.getHeight() / 2 - this.height / 2);
        }
        return new TwoDPosition(startX, startY);
    }

    name(): string {
        if (this.sensorType.isA(TouchSensor)) {
            return "touch";
        } else if (this.sensorType.isA(ColorSensorFull) || this.sensorType.isA(ColorSensorPassive)) {
            return "color_empty";
        } else if (this.sensorType.isA(ColorSensorRed)) {
            return "color_red";
        } else if (this.sensorType.isA(ColorSensorGreen)) {
            return "color_green";
        } else if (this.sensorType.isA(ColorSensorBlue)) {
            return "color_blue";
        } else if (this.sensorType.isA(RangeSensor)) {
            return "sonar";
        } else if (this.sensorType.isA(LightSensor)) {
            return "light";
        } else {
            alert(!"Unknown sensor type");
            return "";
        }
    }

    pathToImage(): string
    {
        return GeneralConstants.APP_ROOT_PATH + "images/2dmodel/sensors/2d_" + this.name() + ".png";
    }

    protected defineImageSizes(sensorType): void {
        if (sensorType.isA(TouchSensor)) {
            this.width = 25;
            this.height = 25;
        } else if (sensorType.isA(ColorSensor) || sensorType.isA(LightSensor)) {
            this.width = 15;
            this.height = 15;
        } else if (sensorType.isA(RangeSensor)) {
            this.width = 35;
            this.height = 35;
        } else {
            alert("Unknown sensor type");
        }
    }

    moveToPoint(positionX: number, positionY: number, direction: number, rotationCX: number, rotationCY: number): void {
        var newX = positionX + this.offsetPosition.x;
        var newY = positionY + this.offsetPosition.y;
        var positionOffsetX = newX - this.startPosition.x;
        var positionOffsetY = newY - this.startPosition.y;
        this.currentTranslation = "t" + positionOffsetX + "," + positionOffsetY;
        this.currentRobotRotation = "R" + direction + "," + rotationCX + "," + rotationCY;
        this.image.transform(this.getTransformation());
    }

    rotate(angle: number): void {
        this.currentRotation = "r" + angle;
        this.image.transform(this.getTransformation());
    }

    rotateByRobot(angle: number, centerX: number, centerY: number) {
        this.currentRobotRotation = "R" + angle + "," + centerX + "," + centerY;
        this.image.transform(this.getTransformation());
    }

    hideHandles(): void {
        this.rotateHandle.hide();
    }

    showHandles(): void {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    }

    remove(): void {
        this.image.remove();
        this.rotateHandle.remove();
    }

    private getTransformation(): string {
        return this.currentRobotRotation + this.currentTranslation + this.currentRotation;
    }
}