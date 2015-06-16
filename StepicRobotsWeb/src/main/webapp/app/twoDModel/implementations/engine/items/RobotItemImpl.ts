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
    private offsetX: number = 0;
    private offsetY: number = 0;
    private timeoutId: number;
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

    private rotateSensors(angle: number, centerX: number, centerY: number) {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.rotateByRobot(angle, centerX, centerY);
        }
    }

    private animateSensors(positionOffsetX: number, positionOffsetY: number): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.animate(positionOffsetX, positionOffsetY);
        }
    }

    private clearSensorsPosition() {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.setStartPosition();
            sensor.transform(this.image.transform());
            sensor.updateTransformationString();
            sensor.restoreStartDirection();
        }
    }

    clearCurrentPosition(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
        this.setStartPosition(this.startPosition, this.startDirection);
        this.clearSensorsPosition();
    }

    showCheckResult(result) {
        var robotItem  = this;
        var traceJson = result.trace;
        this.clearCurrentPosition();

        var animationQueue: AnimationQueue = new AnimationQueue();

        var points = traceJson.points;
        var seqNumber = 1;

        for (var i = 1; i < points.length - 1; i++) {
            animationQueue.push(function() {
                var currentPoint = points[seqNumber];
                var previousPoint = points[seqNumber - 1];

                var newX = currentPoint.x + robotItem.offsetX;
                var newY = currentPoint.y + robotItem.offsetY;
                robotItem.center.x = newX + robotItem.width / 2
                robotItem.center.y = newY + robotItem.height / 2;

                robotItem.image.transform("R" + currentPoint.direction);
                robotItem.rotateSensors(currentPoint.direction, robotItem.center.x,  robotItem.center.y);

                var deltaTime = (currentPoint.timestamp - previousPoint.timestamp) / 10;
                seqNumber++;

                var matrixCx = robotItem.image.matrix.x(robotItem.center.x, robotItem.center.y);
                var matrixCy = robotItem.image.matrix.y(robotItem.center.x, robotItem.center.y);

                robotItem.animateSensors(matrixCx - robotItem.startCenter.x, matrixCy - robotItem.startCenter.y);

                robotItem.image.attr({x: newX, y: newY});
            });
        }
        animationQueue.push(function() {
            robotItem.parseReport(result.report);
        });
        robotItem.timeoutId = setTimeout(function run() {
            if (animationQueue.hasNext()) {
                animationQueue.next().call(this);
                robotItem.timeoutId = setTimeout(run, 10);
            }
        }, 10);
    }

    parseReport(report) {
        var messageText = "";
        var level = report.messages[0].level;
        report.messages.forEach( function(message) {
            messageText += message.message + " ";
        });
        if (level === "info") {
            $("#infoAlert").removeClass("alert-danger");
            $("#infoAlert").addClass("alert-success");
        } else {
            if (level === "error") {
                $("#infoAlert").removeClass("alert-success");
                $("#infoAlert").addClass("alert-danger");
            }
        }
        $("#infoAlert").contents().last()[0].textContent = messageText;
        $("#infoAlert").show();
    }

    setOffsetX(offsetX: number): void {
        this.offsetX = offsetX;
    }

    setOffsetY(offsetY: number): void {
        this.offsetY = offsetY;
    }

    hide(): void {
        this.image.hide();
    }

    show(): void {
        this.image.show();
    }
}