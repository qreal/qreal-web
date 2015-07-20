class SensorItem implements AbstractItem {
    protected robotItem: RobotItem;
    protected image;
    protected angle : number;
    protected width: number = 20;
    protected height: number = 20;
    protected transformationString = "";
    protected rotateHandle: RaphaelElement;
    protected center : TwoDPosition;
    protected start : TwoDPosition;
    protected  parentCenter : TwoDPosition;
    protected sensorType: DeviceInfo;
    protected deltaPosition: TwoDPosition;
    protected handleRadius = 10;
    protected radiusFromParent : number;
    protected innerAngle : number;
    protected outterAngle : number;
    protected radiusFromSensor : number;


    constructor(robotItem: RobotItem, worldModel: WorldModel, sensorType: DeviceInfo, pathToImage: string) {
        this.robotItem = robotItem;
        var paper: RaphaelPaper = worldModel.getPaper();
        this.sensorType = sensorType;
        this.defineImageSizes(sensorType);
        var defaultPosition = this.getDefaultPosition();
        this.start = defaultPosition;
        this.center = new TwoDPosition(this.start.x + this.width / 2, this.start.y + this.height / 2);
        this.parentCenter = robotItem.getCenterPosition();

        this.image = paper.image((pathToImage) ? pathToImage : this.pathToImage(), defaultPosition.x, defaultPosition.y, this.width, this.height);
        this.angle = this.robotItem.getAngle();
        this.radiusFromParent = this.robotItem.getWidth() + this.width + this.width + this.handleRadius;
        this.radiusFromSensor = this.radiusFromParent - (this.center.x - this.parentCenter.x);


        this.image.transform("R" + this.angle + "," +  this.parentCenter.x + "," + this.parentCenter.y);
        var dx = this.center.x - this.parentCenter.x;
        var dy = this.center.y - this.parentCenter.y;

        var angleInRad = this.toRadian(this.angle);

        var newDx = dx * Math.cos(angleInRad) - dy * Math.sin(angleInRad);
        var newDy = dx * Math.sin(angleInRad) + dy * Math.cos(angleInRad);

        console.log(newDx + " " + newDy);

        this.center.x = this.parentCenter.x + newDx;
        this.center.y = this.parentCenter.y + newDy;

        sensor = this;

        sensor.image.attr({"x" : sensor.center.x - sensor.height / 2, "y" : sensor.center.y - sensor.width / 2});
        sensor.image.transform("R" + this.angle);


        var handleAttrs = {
            fill: "#fff",
            "fill-opacity": 0,
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        var sensorItem = this;

        this.rotateHandle = paper.circle(this.parentCenter.x + this.radiusFromParent * Math.cos(angleInRad),
               this.parentCenter.y + this.radiusFromParent * Math.sin(angleInRad), this.handleRadius).attr(handleAttrs);

        this.outterAngle = this.angle;
        this.innerAngle = this.angle;

        var sensor = this;

        var startHandle = function () {

                this.rotation = sensor.angle;
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
                this.lastX = 0;
                this.lastY = 0;

                console.log(sensor.center.x + " -- " + sensor.center.y);
                return this;
            },
            moveHandle = function (dx, dy) {

                var newDx = dx - this.lastX;
                var newDy = dy - this.lastY;

                this.lastX = dx;
                this.lastY = dy;

                var newX = this.cx + newDx;
                var newY = this.cy + newDy;


                if (!worldModel.getDrawMode()) {

                    var offsetX = newX - sensorItem.center.x;
                    var offsetY = newY - sensorItem.center.y;
                    var tan = offsetY / offsetX;
                    var angle = Math.atan(tan) / (Math.PI / 180);
                    if (offsetX < 0) {
                        angle += 180;
                    }

                    console.log(angle);

                    sensorItem.angle = angle;

                    sensor.image.transform("R" + angle);

                    var angleInRad = sensor.toRadian(angle);
                    var newCx = Math.cos(angleInRad) * (sensor.radiusFromSensor) + sensor.center.x;
                    var newCy = Math.sin(angleInRad) * (sensor.radiusFromSensor) + sensor.center.y;

                    this.attr({cx: newCx, cy: newCy});
                    this.cx = newCx;
                    this.cy = newCy;
                    sensor.innerAngle = angle;
                }
                return this;
            },
            upHandle = function () {

                this.lastDx = 0;
                this.lastDy = 0;
                sensor.image.transform("");
                sensor.image.attr({"x" : sensor.center.x - sensor.height / 2, "y" : sensor.center.y - sensor.width / 2});
                sensor.image.transform("R" + sensor.innerAngle);
                return this;
            };

        sensorItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {

                this.tmpDx = 0;
                this.tmpDy = 0;
                if (!worldModel.getDrawMode()) {
                    this.handle_cx = sensorItem.rotateHandle.attr("cx");
                    this.handle_cy = sensorItem.rotateHandle.attr("cy");
                    worldModel.setCurrentElement(sensorItem);
                }
                return this;
            }

            ,move = function (dx, dy) {

                if (!worldModel.getDrawMode()) {
                    sensor.image.transform("R" + sensor.angle + "," + sensor.center.x + "," + sensor.center.y + "T" + dx + "," + dy);
                    this.tmpDx = dx;
                    this.tmpDy = dy;
                    sensor.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!worldModel.getDrawMode()) {

                    sensor.center.x += this.tmpDx;
                    sensor.center.y += this.tmpDy;
                    sensor.image.transform("");
                    sensor.image.attr({"x" : sensor.center.x - sensor.height / 2, "y" : sensor.center.y - sensor.width / 2});
                    sensor.image.transform("R" + sensor.angle + "," + sensor.image.x + "," + sensor.image.y);

                }
                return this;
            };

        this.image.drag(move, start, up);
        this.hideHandles();
    }

    show(): void {
        /*console.log("sensorX: " + this.centerX + " sensorY: " + this.centerY);
        var sensorItem = this;
        sensorItem.centerX = this.image.matrix.x(sensorItem.startCx, sensorItem.startCy);
        sensorItem.centerY = this.image.matrix.y(sensorItem.startCx, sensorItem.startCy);
        var newCx = sensorItem.image.matrix.x(sensorItem.startCx + sensorItem.width / 2 + 20, sensorItem.startCy);
        var newCy = sensorItem.image.matrix.y(sensorItem.startCx + sensorItem.width / 2 + 20, sensorItem.startCy);
        //this.attr({cx: newCx, cy: newCy});*/
        return;
    }


    getDefaultPosition(): TwoDPosition {
        return new TwoDPosition(this.robotItem.getCenterPosition().x + this.robotItem.getWidth() + this.width / 2,
                                      this.robotItem.getCenterPosition().y - this.height / 2);
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

    private toRadian(angle : number) : number {
        return angle * Math.PI / 180.0;
    }

    pathToImage(): string
    {
        return "images/2dmodel/sensors/2d_" + this.name() + ".png";
    }

    defineImageSizes(sensorType): void {
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

    transform(transformationString : string): void {

        var tmpPosition = this.robotItem.getCenterPosition();
        var tmp : string = "";
        for (var i = 1; i < transformationString.length; i++)
            tmp = tmp + transformationString[i];
        if (transformationString[0] === 'T') {
            var shifts : string[] = tmp.split(",");
            this.translateSensor(parseFloat(shifts[0]), parseFloat(shifts[1]));
        } else {
            var params : string[] = tmp.split(",");
            this.rotateSensor(parseFloat(params[0]), parseFloat(params[1]), parseFloat(params[2]));
        }
     //   this.image.transform(this.transformationString + transformationString);
       // var newCx = this.image.matrix.x(this.start.x + this.width / 2 + 20, this.start.y);
       // var newCy = this.image.matrix.y(this.start.x + this.width / 2 + 20, this.start.y);
       // this.rotateHandle.attr({cx: newCx, cy: newCy});
    }

    translateSensor(dx : number, dy : number) {
        var cx = this.rotateHandle.attr("cx");
        var cy = this.rotateHandle.attr("cy");
        this.rotateHandle.attr({"cx" : cx + dx, "cy" : cy + dy});
        var sensor = this;
        sensor.center.x += dx;
        sensor.center.y += dy;
        sensor.image.transform("");
        sensor.image.attr({"x" : sensor.center.x - sensor.height / 2, "y" : sensor.center.y - sensor.width / 2});
        sensor.image.transform("R" + sensor.angle + "," + sensor.image.x + "," + sensor.image.y);
    }

    rotateSensor(angle : number, x : number, y: number) {
        var wasCenter : TwoDPosition = this.center;
        console.log(angle + ", " + x + ", " + y);
        var dxCentr = this.center.x - x;
        var dyCentr = this.center.y - y;
        var dxHandle = this.rotateHandle.attr("cx") - x;
        var dyHandle = this.rotateHandle.attr("cy") - y;
        var angleInRadian = this.toRadian(angle);
        var newXC = dxCentr * Math.cos(angleInRadian) - dyCentr * Math.sin(angleInRadian);
        var newYC = dxCentr * Math.sin(angleInRadian) + dyCentr * Math.cos(angleInRadian);
        this.center.x = newXC + x;
        this.center.y = newYC + y;
        newXC = dxHandle * Math.cos(angleInRadian) - dyHandle * Math.sin(angleInRadian);
        newYC = dxHandle * Math.sin(angleInRadian) + dyHandle * Math.cos(angleInRadian);
        this.rotateHandle.attr({"cx" : x + newXC, "cy" : y + newYC});
        this.angle += angle;
        this.image.transform("");
        var CCX = this.center.x - wasCenter.x;
        var CCY = this.center.y - wasCenter.y;
        this.transform("T" + CCX + "," + CCY);
    }

    updateTransformationString(): void {
        //this.transformationString = this.image.transform();
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