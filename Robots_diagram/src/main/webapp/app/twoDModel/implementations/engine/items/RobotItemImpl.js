var RobotItemImpl = (function () {
    function RobotItemImpl(worldModel, position, imageFileName, robot) {
        this.startCenter = new TwoDPosition();
        this.center = new TwoDPosition();
        this.width = 50;
        this.height = 50;
        this.sensors = {};
        this.worldModel = worldModel;
        this.robot = robot;
        this.startPosition = position;
        var paper = worldModel.getPaper();
        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);
        this.center.x = position.x + this.width / 2;
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x;
        this.startCenter.y = this.center.y;
        var handleRadius = 10;
        var handleAttrs = {
            fill: "#fff",
            "fill-opacity": 0,
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };
        this.rotateHandle = paper.circle(position.x + this.width + 20, position.y + this.height / 2, handleRadius).attr(handleAttrs);
        var robotItem = this;
        var startHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.transformation = robotItem.image.transform();
                robotItem.updateSensorsTransformations();
                this.rotation = robotItem.image.matrix.split().rotate;
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
            }
            return this;
        }, moveHandle = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
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
                robotItem.image.transform(this.transformation + "R" + angle + "," + robotItem.center.x + "," + robotItem.center.y);
                robotItem.transformSensorsItems("R" + angle + "," + robotItem.center.x + "," + robotItem.center.y);
                var newCx = robotItem.image.matrix.x(robotItem.startCenter.x + robotItem.width / 2 + 20, robotItem.startCenter.y);
                var newCy = robotItem.image.matrix.y(robotItem.startCenter.x + robotItem.width / 2 + 20, robotItem.startCenter.y);
                this.attr({ cx: newCx, cy: newCy });
            }
            return this;
        }, upHandle = function () {
            if (!worldModel.getDrawMode()) {
                robotItem.updateSensorsTransformations();
            }
            return this;
        };
        robotItem.rotateHandle.drag(moveHandle, startHandle, upHandle);
        var start = function () {
            if (!worldModel.getDrawMode()) {
                this.transformation = this.transform();
                robotItem.updateSensorsTransformations();
                this.handle_cx = robotItem.rotateHandle.attr("cx");
                this.handle_cy = robotItem.rotateHandle.attr("cy");
                worldModel.setCurrentElement(robotItem);
            }
            return this;
        }, move = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                this.transform(this.transformation + "T" + dx + "," + dy);
                robotItem.transformSensorsItems("T" + dx + "," + dy);
                robotItem.rotateHandle.attr({ "cx": this.handle_cx + dx, "cy": this.handle_cy + dy });
            }
            return this;
        }, up = function () {
            if (!worldModel.getDrawMode()) {
                robotItem.center.x = this.matrix.x(robotItem.startCenter.x, robotItem.startCenter.y);
                robotItem.center.y = this.matrix.y(robotItem.startCenter.x, robotItem.startCenter.y);
                robotItem.updateSensorsTransformations();
            }
            return this;
        };
        this.image.drag(move, start, up);
        this.hideHandles();
    }
    RobotItemImpl.prototype.setStartPosition = function (position, direction) {
        this.startPosition = position;
        this.image.attr({ x: position.x, y: position.y });
        this.center.x = position.x + this.width / 2;
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x;
        this.startCenter.y = this.center.y;
        this.image.transform("R" + direction + "," + this.center.x + "," + this.center.y);
        this.rotateHandle.attr({ "cx": +position.x + this.width + 20, "cy": position.y + this.height / 2 });
    };
    RobotItemImpl.prototype.ride = function () {
        console.log("robot ride");
    };
    RobotItemImpl.prototype.hideHandles = function () {
        this.rotateHandle.hide();
    };
    RobotItemImpl.prototype.showHandles = function () {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    };
    RobotItemImpl.prototype.getWidth = function () {
        return this.width;
    };
    RobotItemImpl.prototype.getHeight = function () {
        return this.height;
    };
    RobotItemImpl.prototype.getStartPosition = function () {
        return this.startPosition;
    };
    RobotItemImpl.prototype.removeSensorItem = function (portName) {
        var sensor = this.sensors[portName];
        if (sensor) {
            sensor.remove();
            delete this.sensors[portName];
        }
    };
    RobotItemImpl.prototype.addSensorItem = function (portName, sensorType, pathToImage) {
        var sensor;
        if (sensorType.isA(RangeSensor)) {
            sensor = new SonarSensorItem(this, this.worldModel, sensorType, pathToImage);
        }
        else {
            sensor = new SensorItem(this, this.worldModel, sensorType, pathToImage);
        }
        sensor.transform(this.image.transform());
        sensor.updateTransformationString();
        this.sensors[portName] = sensor;
    };
    RobotItemImpl.prototype.updateSensorsTransformations = function () {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.updateTransformationString();
        }
    };
    RobotItemImpl.prototype.transformSensorsItems = function (transformationString) {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.transform(transformationString);
        }
    };
    return RobotItemImpl;
})();
//# sourceMappingURL=RobotItemImpl.js.map