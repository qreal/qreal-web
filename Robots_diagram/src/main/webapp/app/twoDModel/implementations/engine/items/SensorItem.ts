class SensorItem implements AbstractItem {
    protected robotItem: RobotItem;
    protected image: RaphaelElement;
    protected width: number;
    protected height: number;
    protected transformationString = "";
    protected rotateHandle: RaphaelElement;
    protected centerX: number;
    protected centerY: number;
    protected startCx: number;
    protected startCy: number;
    protected sensorType: DeviceInfo;

    constructor(robotItem: RobotItem, worldModel: WorldModel, sensorType: DeviceInfo, pathToImage: string) {
        this.robotItem = robotItem;
        var paper: RaphaelPaper = worldModel.getPaper();
        this.sensorType = sensorType;
        this.degineImageSizes(sensorType);
        var defaultPosition = this.getDefaultPosition();
        this.image = paper.image((pathToImage) ? pathToImage : this.pathToImage(),
            defaultPosition.x, defaultPosition.y, this.width, this.height);

        this.centerX = defaultPosition.x + this.width / 2;
        this.centerY = defaultPosition.y + this.height / 2;

        this.startCx = this.centerX;
        this.startCy = this.centerY;

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "#fff",
            "fill-opacity": 0,
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        var sensorItem = this;

        this.rotateHandle = paper.circle(defaultPosition.x + this.width + 20,
            defaultPosition.y + this.height / 2, handleRadius).attr(handleAttrs);

        var startHandle = function () {
                if (!worldModel.getDrawMode()) {
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");

                    this.rotation = sensorItem.image.matrix.split().rotate;
                }
                return this;
            },
            moveHandle = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
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
                if (!worldModel.getDrawMode()) {
                    this.handle_cx = sensorItem.rotateHandle.attr("cx");
                    this.handle_cy = sensorItem.rotateHandle.attr("cy");
                    worldModel.setCurrentElement(sensorItem);
                }
                return this;
            }
            ,move = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    sensorItem.transform("T" + dx + "," + dy);

                    sensorItem.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!worldModel.getDrawMode()) {
                    sensorItem.centerX = this.matrix.x(sensorItem.startCx, sensorItem.startCy);
                    sensorItem.centerY = this.matrix.y(sensorItem.startCx, sensorItem.startCy);
                }
                sensorItem.updateTransformationString();
                return this;
            }
        this.image.drag(move, start, up);
        this.hideHandles();
    }

    getDefaultPosition(): TwoDPosition {
        var startX = this.robotItem.getStartPosition().x + this.robotItem.getWidth() + 15;
        var startY = this.robotItem.getStartPosition().y + this.robotItem.getHeight() / 2 - this.height / 2;
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