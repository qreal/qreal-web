class RobotItemImpl implements RobotItem {
    private worldModel: WorldModel;
    private robot: RobotModel;
    private startPosition: TwoDPosition;
    private startDirection: number;
    private startCenter: TwoDPosition = new TwoDPosition();
    private center: TwoDPosition = new TwoDPosition();
    private image;
    private rotateHandle: RaphaelElement;
    private width: number = 50;
    private height: number = 50;

    private sensors: {string?: SensorItem} = {};

    constructor(worldModel: WorldModel, position: TwoDPosition, imageFileName: string, robot: RobotModel) {
        this.worldModel = worldModel;
        this.robot = robot;
        this.startPosition = position;
        this.startDirection = 0;
        var paper = worldModel.getPaper();
        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);

        this.center.x = position.x + this.width / 2
        this.center.y = position.y + this.height / 2;

        this.startCenter.x = this.center.x
        this.startCenter.y = this.center.y;

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotateHandle = paper.circle(position.x + this.width + 20,
            position.y + this.height / 2, handleRadius).attr(handleAttrs);
        this.hideHandles();
    }

    setDraggable(): void {
        var robotItem = this;
        robotItem.image.attr({cursor: "pointer"});

        var startHandle = function () {
                if (!robotItem.worldModel.getDrawMode()) {
                    this.transformation = robotItem.image.transform();
                    robotItem.updateSensorsTransformations();

                    this.rotation = robotItem.image.matrix.split().rotate;
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");
                }
                return this;
            },
            moveHandle = function (dx, dy) {
                if (!robotItem.worldModel.getDrawMode()) {
                    var newX = this.cx + dx;
                    var newY = this.cy + dy;
                    var offsetX = newX - robotItem.center.x;
                    var offsetY = newY - robotItem.center.y;
                    var tan = offsetY / offsetX;
                    var angle = Math.atan(tan) / (Math.PI / 180);
                    if (offsetX < 0) {
                        angle += 180;
                    }

                    angle -= this.rotation;
                    robotItem.image.transform(this.transformation + "R" + angle + "," +
                        robotItem.center.x + "," + robotItem.center.y);

                    robotItem.transformSensorsItems("R" + angle + "," + robotItem.center.x + "," + robotItem.center.y);

                    var newCx = robotItem.image.matrix.x(robotItem.startCenter.x + robotItem.width / 2 + 20,
                        robotItem.startCenter.y);
                    var newCy = robotItem.image.matrix.y(robotItem.startCenter.x + robotItem.width / 2 + 20,
                        robotItem.startCenter.y);
                    this.attr({cx: newCx, cy: newCy});
                }
                return this;
            },
            upHandle = function () {
                if (!robotItem.worldModel.getDrawMode()) {
                    robotItem.updateSensorsTransformations();
                }
                return this;
            };

        robotItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {
                if (!robotItem.worldModel.getDrawMode()) {
                    this.transformation = this.transform();
                    robotItem.updateSensorsTransformations();

                    this.handle_cx = robotItem.rotateHandle.attr("cx");
                    this.handle_cy = robotItem.rotateHandle.attr("cy");
                    robotItem.worldModel.setCurrentElement(robotItem);
                }
                return this;
            }
            ,move = function (dx, dy) {
                if (!robotItem.worldModel.getDrawMode()) {
                    this.transform(this.transformation + "T" + dx + "," + dy);

                    robotItem.transformSensorsItems("T" + dx + "," + dy);

                    robotItem.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!robotItem.worldModel.getDrawMode()) {
                    robotItem.center.x = this.matrix.x(robotItem.startCenter.x, robotItem.startCenter.y);
                    robotItem.center.y = this.matrix.y(robotItem.startCenter.x, robotItem.startCenter.y);
                    robotItem.updateSensorsTransformations();
                }
                return this;
            }
        this.image.drag(move, start, up);
    }

    setStartPosition(position: TwoDPosition, direction: number): void {
        this.startPosition = position;
        this.startDirection = direction;
        this.image.attr({x: position.x, y: position.y});
        this.center.x = position.x + this.width / 2
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x
        this.startCenter.y = this.center.y;
        this.image.transform("R" + direction + "," + this.center.x + "," + this.center.y);
        this.rotateHandle.attr({"cx": + position.x + this.width + 20, "cy": position.y + this.height / 2 });

    }

    ride(): void {
        console.log("robot ride");
    }

    hideHandles(): void {
        this.rotateHandle.hide();
    }

    showHandles(): void {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getStartPosition(): TwoDPosition {
        return this.startPosition;
    }

    removeSensorItem(portName: string): void {
        var sensor = this.sensors[portName];
        if (sensor) {
            sensor.remove();
            delete this.sensors[portName];
        }
    }

    addSensorItem(portName: string, sensorType: DeviceInfo, pathToImage: string,
                  position?: TwoDPosition, direction?: number): void {
        var sensor: SensorItem;
        if (sensorType.isA(RangeSensor)) {
            sensor = new SonarSensorItem(this, this.worldModel, sensorType, pathToImage, position);
        } else {
            sensor = new SensorItem(this, this.worldModel, sensorType, pathToImage, position);
        }
        sensor.transform(this.image.transform());
        sensor.updateTransformationString();
        if (direction) {
            sensor.setStartDirection(direction);
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
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.transform(transformationString);
        }
    }

    private animateSensors(element, transformationString: string, animation, timestamp): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.animate(element, transformationString, animation, timestamp);
        }
    }

    private clearSensorsPosition() {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.stopAnimation();
            sensor.setStartPosition();
            sensor.transform(this.image.transform());
            sensor.updateTransformationString();
            sensor.restoreStartDirection();
        }
    }

    clearCurrentPosition(): void {
        this.image.stop();
        this.setStartPosition(this.startPosition, this.startDirection);
        this.clearSensorsPosition();
    }

    rideTrace(traceJson) {
        this.clearCurrentPosition();
        var animation = this.createAnimationSequence(traceJson, 0);
        this.image.animate(animation);
        this.animateSensors(this.image, "T" + traceJson.points[0].x + "," + traceJson.points[0].y, animation, traceJson.points[0].timestamp);

    }

    private createAnimationSequence(traceJson, seqNumber: number): RaphaelAnimation {
        this.updateSensorsTransformations();
        this.center.x = this.image.matrix.x(this.startCenter.x, this.startCenter.y);
        this.center.y = this.image.matrix.y(this.startCenter.x, this.startCenter.y);
        var point = traceJson.points[seqNumber];
        var angle = point.direction - this.image.matrix.split().rotate;
        var currentTransformation = this.image.transform();

        this.image.transform(currentTransformation + "R" + angle + "," + this.center.x + "," + this.center.y);
        this.transformSensorsItems("R" + angle + "," + this.center.x + "," + this.center.y);
        this.updateSensorsTransformations();

        var robotTransform = this.image.transform() + "T" + point.x + "," + point.y;
        this.updateSensorsTransformations();

        var robotItem = this;

        if (seqNumber < traceJson.points.length - 1) {
            return Raphael.animation({ transform: robotTransform }, point.timestamp, "linear",
                function() {
                    var animation = robotItem.createAnimationSequence(traceJson, seqNumber + 1);
                    robotItem.image.animate(animation);
                    robotItem.animateSensors(this.image,
                        "T" + traceJson.points[seqNumber + 1].x + "," + traceJson.points[seqNumber + 1].y, animation, traceJson.points[seqNumber + 1].timestamp);
                });
        }

        return Raphael.animation({ transform: robotTransform }, point.timestamp);
    }

    hide(): void {
        this.image.hide();
    }

    show(): void {
        this.image.show();
    }
}