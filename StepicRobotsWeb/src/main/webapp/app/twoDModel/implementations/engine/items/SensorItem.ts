class SensorItem {
    protected robotItem: RobotItem;
    protected worldModel: WorldModel;
    protected image: RaphaelElement;
    protected width: number;
    protected height: number;
    protected transformationString = "";
    protected rotateHandle: RaphaelElement;
    protected centerX: number;
    protected centerY: number;
    protected startCx: number;
    protected startCy: number;
    protected startPosition: TwoDPosition;
    protected startDirection: number;
    protected sensorType: DeviceInfo;

    constructor(robotItem: RobotItem, worldModel: WorldModel, sensorType: DeviceInfo,
                pathToImage: string, position?: TwoDPosition) {
        this.robotItem = robotItem;
        this.worldModel = worldModel;
        var paper: RaphaelPaper = worldModel.getPaper();
        this.sensorType = sensorType;
        this.degineImageSizes(sensorType);
        this.startPosition = this.getStartPosition(position);
        this.startDirection = 0;
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
        this.updateTransformationString();
    }

    setStartPosition() {
        this.image.attr({x: this.startPosition.x, y: this.startPosition.y});
        this.centerX = this.startPosition.x + this.width / 2;
        this.centerY = this.startPosition.y + this.height / 2;
        this.startCx = this.centerX;
        this.startCy = this.centerY;
        this.rotateHandle.attr({"cx": + this.startPosition.x + this.width + 20, "cy": this.startPosition.y + this.height / 2 });
        this.image.transform("");
        this.transformationString = "";
    }

    restoreStartDirection() {
        this.rotate(this.startDirection);
        this.updateTransformationString();
    }

    setDraggable(): void {
        var sensorItem = this;
        sensorItem.image.attr({cursor: "pointer"});

        var startHandle = function () {
                if (!sensorItem.worldModel.getDrawMode()) {
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");

                    this.rotation = sensorItem.image.matrix.split().rotate;
                }
                return this;
            },
            moveHandle = function (dx, dy) {
                if (!sensorItem.worldModel.getDrawMode()) {
                    var newX = this.cx + dx;
                    var newY = this.cy + dy;
                    var offsetX = newX - sensorItem.centerX;
                    var offsetY = newY - sensorItem.centerY;
                    var tan = offsetY / offsetX;
                    var angle = Math.atan(tan) / (Math.PI / 180);
                    if (offsetX < 0) {
                        angle += 180;
                    }

                    angle -= this.rotation;
                    sensorItem.rotate(angle);

                    var newCx = sensorItem.image.matrix.x(sensorItem.startCx + sensorItem.width / 2 + 20, sensorItem.startCy);
                    var newCy = sensorItem.image.matrix.y(sensorItem.startCx + sensorItem.width / 2 + 20, sensorItem.startCy);
                    this.attr({cx: newCx, cy: newCy});
                }
                return this;
            },
            upHandle = function () {
                sensorItem.updateTransformationString();
                return this;
            };

        sensorItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {
                if (!sensorItem.worldModel.getDrawMode()) {
                    this.handle_cx = sensorItem.rotateHandle.attr("cx");
                    this.handle_cy = sensorItem.rotateHandle.attr("cy");
                    sensorItem.worldModel.setCurrentElement(sensorItem);
                }
                return this;
            }
            ,move = function (dx, dy) {
                if (!sensorItem.worldModel.getDrawMode()) {
                    sensorItem.transform("T" + dx + "," + dy);

                    sensorItem.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!sensorItem.worldModel.getDrawMode()) {
                    sensorItem.centerX = this.matrix.x(sensorItem.startCx, sensorItem.startCy);
                    sensorItem.centerY = this.matrix.y(sensorItem.startCx, sensorItem.startCy);
                }
                sensorItem.updateTransformationString();
                return this;
            }
        this.image.drag(move, start, up);
    }

    getStartPosition(position: TwoDPosition): TwoDPosition {
        var startX = this.robotItem.getStartPosition().x;
        var startY = this.robotItem.getStartPosition().y;
        if (position) {
            startX += position.x - this.width / 2;
            startY += position.y - this.height / 2;
        } else {
            startX = startX + this.robotItem.getWidth() + 15;
            startY = startY + this.robotItem.getHeight() / 2 - this.height / 2;
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
        return "images/2dmodel/sensors/2d_" + this.name() + ".png";
    }

    protected degineImageSizes(sensorType): void {
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

    transform(transformationString): void {
        this.image.transform(this.transformationString + transformationString);
        var newCx = this.image.matrix.x(this.startCx + this.width / 2 + 20, this.startCy);
        var newCy = this.image.matrix.y(this.startCx + this.width / 2 + 20, this.startCy);
        this.rotateHandle.attr({cx: newCx, cy: newCy});
    }

    animate(element, transformationString, animation, timestamp): void {
        var sensorAnimation = Raphael.animation({ transform: this.transformationString + transformationString }, timestamp);
        this.image.animateWith(element, animation, sensorAnimation);
        var newCx = this.image.matrix.x(this.startCx + this.width / 2 + 20, this.startCy);
        var newCy = this.image.matrix.y(this.startCx + this.width / 2 + 20, this.startCy);
    }

    stopAnimation(): void {
        this.image.stop();
    }

    updateTransformationString(): void {
        this.transformationString = this.image.transform();
    }

    rotate(angle: number) {
        this.image.transform(this.transformationString + "R" + angle)
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
}