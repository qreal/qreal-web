class RobotItemImpl implements RobotItem {
    private worldModel: WorldModel;
    private marker: Marker;
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
    private direction: number;
    private roughening: number = 50;
    private counter: number = 0;
    private isFollow: boolean;
    private scroller: StageScroller;

    constructor(worldModel: WorldModel, position: TwoDPosition, imageFileName: string, robot: RobotModel) {
        this.worldModel = worldModel;
        this.startPosition = position;
        this.direction = 0;
        this.startDirection = 0;
        this.isFollow = false;
        this.scroller = new StageScroller();
        var paper = worldModel.getPaper();

        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);

        this.changeCenterPosition(position.x + this.width / 2, position.y + this.height / 2);

        this.startCenter.x = this.center.x
        this.startCenter.y = this.center.y;

        this.marker = new Marker(paper, new TwoDPosition(this.center.x, this.center.y));

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
        this.changeCenterPosition(position.x + this.width / 2, position.y + this.height / 2);
        this.startCenter.x = this.center.x
        this.startCenter.y = this.center.y;
        this.image.transform("R" + direction + "," + this.center.x + "," + this.center.y);
        this.rotateHandle.attr({"cx": + position.x + this.width + 20, "cy": position.y + this.height / 2 });

        this.marker.setCenter(new TwoDPosition(this.center.x, this.center.y));
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

    moveSensors(positionX: number, positionY: number, direction: number, centerX: number, centerY: number): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.moveToPoint(positionX, positionY, direction, centerX, centerY);
        }
    }

    clearCurrentPosition(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
        this.marker.setDown(false);
        this.marker.setColor("#000000");
        this.marker.setCenter(new TwoDPosition(this.center.x, this.center.y));
        this.marker.clear();
        this.setStartPosition(this.startPosition, this.startDirection);
        this.clearSensorsPosition();
        this.counter = 0;
    }

    setOffsetX(offsetX: number): void {
        this.offsetX = offsetX;
    }

    setOffsetY(offsetY: number): void {
        this.offsetY = offsetY;
    }

    moveToPoint(x: number, y: number, rotation: number): void {
        var newX = x + this.offsetX;
        var newY = y + this.offsetY;

        var newCenterX = newX + this.width / 2;
        var newCenterY = newY + this.height / 2;

        this.changeCenterPosition(newCenterX, newCenterY);

        this.image.transform("R" + rotation);

        this.direction = rotation;

        this.moveSensors(newX, newY, rotation, this.center.x, this.center.y);

        this.image.attr({x: newX, y: newY});

        if (this.marker.isDown()) {
            if (this.counter > this.roughening) {
                this.marker.setCenter(new TwoDPosition(this.center.x, this.center.y));
                this.marker.drawPoint();
                this.counter = 0;
            } else {
                this.counter++;
            }
        } else {
            this.marker.setCenter(new TwoDPosition(this.center.x, this.center.y));
        }
    }

    setMarkerDown(down: boolean): void {
        this.marker.setDown(down);
    }

    setMarkerColor(color: string): void {
        this.marker.setColor(color);
    }

    hide(): void {
        this.image.hide();
    }

    show(): void {
        this.image.show();
    }

    follow(value: boolean): void {
        this.isFollow = value;
    }

    returnToStart(): void {
        this.scroller.scrollToPoint(this.startPosition.x, this.startPosition.y);
    }

    private changeCenterPosition(x: number, y: number) {
        this.center.x = x;
        this.center.y = y;
        if (this.isFollow) {
            this.scroller.scrollToPoint(x, y);
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
}