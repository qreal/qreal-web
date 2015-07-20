class RobotItemImpl implements RobotItem {

    private worldModel: WorldModel;
    private robot: RobotModel;
    private startPosition: TwoDPosition;
    private startCenter: TwoDPosition = new TwoDPosition();
    private center: TwoDPosition = new TwoDPosition();
    private currentStartPosition : TwoDPosition = new TwoDPosition();
    private image;
    private rotateHandle: RaphaelElement;
    private width: number = 50;
    private height: number = 50;
    private angle: number;
    private lastDx: number;
    private lastDy: number;
    private previousAngle : number;
    private sensors: {string?: SensorItem} = {};

    constructor(worldModel: WorldModel, position: TwoDPosition, imageFileName: string, robot: RobotModel) {
        this.worldModel = worldModel;
        this.robot = robot;
        this.startPosition = position;
        this.currentStartPosition = this.startPosition;
        this.angle = 0;
        var paper = worldModel.getPaper();
        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);
        this.center = new TwoDPosition(position.x + this.width / 2, position.y + this.width / 2);
        this.startCenter = new TwoDPosition(this.center.x, this.center.y);
        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "#fff",
            "fill-opacity": 0,
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotateHandle = paper.circle(position.x + this.width + 20,
                position.y + this.height / 2, handleRadius).attr(handleAttrs);

        var robotItem = this;
        robotItem.angle = 0;

        var startHandle = function () {

                this.rotation = robotItem.angle;
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");

                // lastDx and lastDy - delta on the previous moment
                this.lastDx = 0;
                this.lastDy = 0;

                if (!worldModel.getDrawMode()) {
                    robotItem.updateSensorsTransformations();
                }
                return this;
            },
            moveHandle = function (dx, dy) {
                if (!worldModel.getDrawMode()) {

                    var newDx = dx - this.lastDx;
                    var newDy = dy - this.lastDy;

                    this.lastDx = dx;
                    this.lastDy = dy;

                    var newX = this.cx + newDx;
                    var newY = this.cy + newDy;

                    var offsetX = newX - robotItem.center.x;
                    var offsetY = newY - robotItem.center.y;
                    var tan = offsetY / offsetX;
                    var angle = Math.atan(tan) / (Math.PI / 180);
                    if (offsetX < 0) {
                        angle += 180;
                    }

                    var diffAngle = angle - robotItem.angle;

                    robotItem.image.transform("R" + angle + "," + robotItem.center.x + "," + robotItem.center.y);
                    robotItem.transformSensorsItems("R" + diffAngle + "," + robotItem.center.x + "," + robotItem.center.y);

                    var angleInRad = angle * Math.PI / 180.0;
                    var newCx = Math.cos(angleInRad) * (robotItem.width / 2 + 20) + robotItem.center.x;
                    var newCy = Math.sin(angleInRad) * (robotItem.width / 2 + 20) + robotItem.center.y;
                    this.attr({cx: newCx, cy: newCy});
                    this.cx = newCx;
                    this.cy = newCy;
                    robotItem.angle = angle;
                }
                return this;
            },
            upHandle = function () {

                this.lastDx = 0;
                this.lastDy = 0;

                robotItem.image.transform("");
                robotItem.image.attr({"x" : robotItem.center.x - robotItem.height / 2,
                                            "y" : robotItem.center.y - robotItem.width / 2});

                robotItem.image.transform("R" + robotItem.angle);

                if (!worldModel.getDrawMode()) {

                    robotItem.updateSensorsTransformations();
                }
                return this;
            };

        robotItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {

                this.lastDx = 0;
                this.lastDy = 0;
                if (!worldModel.getDrawMode()) {
                    robotItem.updateSensorsTransformations();
                    this.handleCx = robotItem.rotateHandle.attr("cx");
                    this.handleCy = robotItem.rotateHandle.attr("cy");
                    worldModel.setCurrentElement(robotItem);
                }
                return this;
            }
            ,move = function (dx, dy) {
                var newDx = dx - this.lastDx;
                var newDy = dy - this.lastDy;
                if (!worldModel.getDrawMode()) {
                    robotItem.image.transform("R" + robotItem.angle + "," + robotItem.center.x + "," + robotItem.center.y + "T" + dx + "," + dy);
                    robotItem.transformSensorsItems("T" + newDx + "," + newDy);
                    this.lastDx = dx;
                    this.lastDy = dy;

                    robotItem.rotateHandle.attr({"cx": this.handleCx + dx, "cy": this.handleCy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!worldModel.getDrawMode()) {
                    robotItem.center.x += this.lastDx;
                    robotItem.center.y += this.lastDy;

                    robotItem.image.transform("");
                    robotItem.image.attr({"x" : robotItem.center.x - robotItem.height / 2, "y" : robotItem.center.y - robotItem.width / 2});
                    robotItem.image.transform("R" + robotItem.angle + "," + robotItem.image.x + "," + robotItem.image.y);

                    robotItem.updateSensorsTransformations();
                }
                return this;
            };

        this.image.drag(move, start, up);
        this.hideHandles();
    }

    private getRightAngleValue(angle : number) : number {
        return angle * Math.PI / 180.0;
    }

    getRotateHandle(): RaphaelElement {
        return this.rotateHandle;
    }

    setStartPosition(position: TwoDPosition, direction: number): void {
        this.startPosition = position;
        this.image.attr({x: position.x, y: position.y});
        this.center.x = position.x + this.width / 2;
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x;
        this.startCenter.y = this.center.y;
        this.image.transform("R" + direction + "," + this.center.x + "," + this.center.y);
        this.rotateHandle.attr({"cx": + position.x + this.width + 20, "cy": position.y + this.height / 2 });

    }

    redraw(): void {

        var diffX = this.center.x - this.startCenter.x;
        var diffY = this.center.y - this.startCenter.y;

        var robotItem = this;

        robotItem.image.transform("");
        robotItem.image.attr({"x" : robotItem.center.x - robotItem.height / 2, "y" : robotItem.center.y - robotItem.width / 2});


        // Change the rotateHandle's position to a new center!

        var oldX = robotItem.rotateHandle.attr("cx");
        var oldY = robotItem.rotateHandle.attr("cy");
        robotItem.rotateHandle.attr({cx : oldX + diffX, cy : oldY + diffY});

        var diffAngle : number = this.angle - this.previousAngle
        this.rotateCircle(diffAngle);

        robotItem.image.transform("R" + robotItem.angle);
        robotItem.transformSensorsItems("T" + diffX + "," + diffY);
        robotItem.transformSensorsItems("R" + diffAngle +"," + this.center.x + "," + this.center.y);
    }

    public getAngle() : number {
        return this.angle;
    }

    /**
     * Rotate the rotateHandle by angle degrees relative to the center of the machine
     * @param angle
     */
    private rotateCircle(angle : number) : void {
        var cX = this.rotateHandle.attr("cx");
        var cY = this.rotateHandle.attr("cy");
        var diffX = cX - this.center.x;
        var diffY = cY - this.center.y;
        var angleInRad = angle * Math.PI / 180;
        var newDX = diffX * Math.cos(angleInRad) - diffY * Math.sin(angleInRad);
        var newDY = diffX * Math.sin(angleInRad) + diffY * Math.cos(angleInRad);
        this.rotateHandle.attr({cx : this.center.x + newDX, cy : this.center.y + newDY});
    }


    informSensorsAboutStoppingRunning() : void {
        //this.updateSensorsTransformations();
    }

    /**
     * Save the previous position and angle in stratCenter and previousAngle
     * @param position - new position for robot
     * @param angle - new angle for robot
     */
    updateRobotLocation(position: TwoDPosition, angle): void {
        this.startCenter = new TwoDPosition(this.center.x, this.center.y);
        this.previousAngle = this.angle;
        this.center.x = position.x;
        this.center.y = position.y;
        this.angle = angle;
    }

    hideHandles(): void {
        this.rotateHandle.hide();
    }

    showHandles(): void {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    }

    getCenterPosition() : TwoDPosition {
        return this.center;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getAngleInRadian() : number {
        return this.angle * Math.PI / 180.0;
    }

    getCurrentPosition() : TwoDPosition {
        return new TwoDPosition(this.center.x, this.center.y);
    }

    getStartPosition(): TwoDPosition {
        return this.startPosition;
    }

    getWorldModel() : WorldModel {
       return this.worldModel;
    }

    removeSensorItem(portName: string): void {
        var sensor = this.sensors[portName];
        if (sensor) {
            sensor.remove();
            delete this.sensors[portName];
        }
    }

    addSensorItem(portName: string, sensorType: DeviceInfo, pathToImage: string): void {
        var sensor: SensorItem;
        if (sensorType.isA(RangeSensor)) {
            sensor = new SonarSensorItem(this, this.worldModel, sensorType, pathToImage);
        } else {
            sensor = new SensorItem(this, this.worldModel, sensorType, pathToImage);
        }
        this.sensors[portName] = sensor;
    }

    private updateSensorsTransformations(): void {
        for(var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.updateTransformationString();
        }
    }

    private transformSensorsItems(transformationString: string): void {
        for(var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.transform(transformationString);
        }
    }
}