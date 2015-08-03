class RobotItemImpl implements RobotItem {
    private worldModel: WorldModel;
    private robot: RobotModel;
    private startPosition: TwoDPosition;
    private startDirection: number;
    private startCenter: TwoDPosition = new TwoDPosition();
    private center: TwoDPosition = new TwoDPosition();
    private image: RaphaelElement;
    private rotateHandle: RaphaelElement;
    private width: number = 50;
    private height: number = 50;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private timeoutId: number;
    private sensors: {string?: SensorItem} = {};
    private startPositionCross: StartPositionItem;
    private direction: number;

    constructor(worldModel: WorldModel, position: TwoDPosition, imageFileName: string, robot: RobotModel) {
        this.worldModel = worldModel;
        this.robot = robot;
        this.startPosition = position;
        this.direction = 0;
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

    setStartPosition(position: TwoDPosition, direction: number): void {
        this.startPosition = position;
        this.direction = direction;
        this.startDirection = direction;
        this.image.attr({x: position.x, y: position.y});
        this.center.x = position.x + this.width / 2
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x
        this.startCenter.y = this.center.y;
        this.image.transform("R" + direction + "," + this.center.x + "," + this.center.y);
        this.rotateHandle.attr({"cx": + position.x + this.width + 20, "cy": position.y + this.height / 2 });
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
        sensor.rotateByRobot(this.direction, this.center.x, this.center.y);
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

    private rotateSensors(angle: number, centerX: number, centerY: number) {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.rotateByRobot(angle, centerX, centerY);
        }
    }

    private animateSensors(positionX: number, positionY: number): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.animate(positionX, positionY);
        }
    }

    private clearSensorsPosition() {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.setStartPosition();
            sensor.rotateByRobot(this.direction, this.center.x, this.center.y);
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
            var delay = points[i].timestamp - points[i - 1].timestamp;
            animationQueue.push(function() {
                var currentPoint = points[seqNumber];
                var newX = currentPoint.x + robotItem.offsetX;
                var newY = currentPoint.y + robotItem.offsetY;
                robotItem.center.x = newX + robotItem.width / 2;
                robotItem.center.y = newY + robotItem.height / 2;

                robotItem.image.transform("R" + currentPoint.direction);
                robotItem.direction = currentPoint.direction;
                robotItem.rotateSensors(currentPoint.direction, robotItem.center.x, robotItem.center.y);

                seqNumber++;

                robotItem.animateSensors(newX, newY);

                robotItem.image.attr({x: newX, y: newY});
            }, delay);
        }
        animationQueue.push(function() {
            robotItem.parseReport(result.report);
        }, 0);
        robotItem.timeoutId = setTimeout(function run() {
            if (animationQueue.hasNext()) {
                animationQueue.next().call(this);
                robotItem.timeoutId = setTimeout(run, animationQueue.getNextDelay());
            }
        }, 0);
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

    setStartPositionCross(x: number, y: number, direction: number) {
        this.startPositionCross = new StartPositionItem(this.worldModel, x + this.offsetX, y + this.offsetY, direction);
    }

    hide(): void {
        this.image.hide();
    }

    show(): void {
        this.image.show();
    }
}