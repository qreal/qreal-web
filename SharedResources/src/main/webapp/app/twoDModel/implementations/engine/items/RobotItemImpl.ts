/*
 * Copyright Vladimir Zakharov 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference path="SensorItem.ts" />
/// <reference path="SonarSensorItem.ts" />
/// <reference path="../StageScroller.ts" />
/// <reference path="../model/Marker.ts" />
/// <reference path="../../robotModel/robotParts/RangeSensor.ts" />
/// <reference path="../../../interfaces/engine/items/RobotItem.ts" />
/// <reference path="../../../interfaces/engine/model/WorldModel.ts" />
/// <reference path="../../../interfaces/engine/model/RobotModel.ts" />
/// <reference path="../../../interfaces/robotModel/DeviceInfo.ts" />
/// <reference path="../../../types/TwoDPosition.ts" />
/// <reference path="../../../../vendor.d.ts" />

class RobotItemImpl implements RobotItem {
    private worldModel: WorldModel;
    private marker: Marker;
    private startPosition: TwoDPosition;
    private startDirection: number;
    private startCenter: TwoDPosition = new TwoDPosition();
    private image: RaphaelElement;
    private rotationHandle: RaphaelElement;
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
    private offsetPosition: TwoDPosition;

    constructor(worldModel: WorldModel, position: TwoDPosition, imageFileName: string, robot: RobotModel) {
        this.worldModel = worldModel;
        this.startPosition = position;
        this.direction = 0;
        this.startDirection = 0;
        this.isFollow = false;
        this.scroller = new StageScroller();
        this.offsetPosition = new TwoDPosition();
        var paper = worldModel.getPaper();

        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);

        this.startCenter.x = position.x + this.width / 2
        this.startCenter.y = position.y + this.height / 2;

        this.marker = new Marker(paper, new TwoDPosition(this.startCenter.x, this.startCenter.y));

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotationHandle = paper.circle(position.x + this.width + 20,
            position.y + this.height / 2, handleRadius).attr(handleAttrs);
        this.initDragAndDrop();
        this.hideHandles();
    }

    setStartPosition(position: TwoDPosition, direction: number): void {
        this.startPosition = position;
        this.direction = direction;
        this.offsetPosition.x = 0;
        this.offsetPosition.y = 0;
        this.startDirection = direction;
        this.image.attr({x: position.x, y: position.y});
        this.startCenter.x = position.x + this.width / 2;
        this.startCenter.y = position.y + this.height / 2;
        this.rotationHandle.attr({"cx": + position.x + this.width + 20, "cy": position.y + this.height / 2 });
        this.updateTransformation();
        this.marker.setCenter(new TwoDPosition(this.startCenter.x, this.startCenter.y));
    }

    hideHandles(): void {
        this.rotationHandle.hide();
    }

    showHandles(): void {
        this.rotationHandle.toFront();
        this.rotationHandle.show();
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

    getDirection(): number {
        return this.direction;
    }

    getCenter(): TwoDPosition {
        var centerX = this.image.matrix.x(this.startCenter.x, this.startCenter.y);
        var centerY = this.image.matrix.y(this.startCenter.x, this.startCenter.y);
        return new TwoDPosition(centerX, centerY);
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
        if (direction) {
            sensor.setStartDirection(direction);
        }
        sensor.updateTransformation();
        this.sensors[portName] = sensor;
    }

    moveSensors(deltaX: number, deltaY: number, direction: number, centerX: number, centerY: number): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.move(deltaX, deltaY, direction, centerX, centerY);
        }
    }

    clearCurrentPosition(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
        this.marker.setDown(false);
        this.marker.setColor("#000000");
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

        this.offsetPosition.x = newX - this.startPosition.x;
        this.offsetPosition.y = newY - this.startPosition.y;

        this.direction = rotation;
        this.updateTransformation();
        var center: TwoDPosition = this.getCenter();
        this.moveSensors(this.offsetPosition.x, this.offsetPosition.y, rotation, center.x, center.y);

        if (this.marker.isDown()) {
            if (this.counter > this.roughening) {
                this.marker.setCenter(new TwoDPosition(center.x, center.y));
                this.marker.drawPoint();
                this.counter = 0;
            } else {
                this.counter++;
            }
        } else {
            this.marker.setCenter(new TwoDPosition(center.x, center.y));
        }
    }

    move(deltaX: number, deltaY: number, direction: number): void {
        this.offsetPosition.x += deltaX;
        this.offsetPosition.y += deltaY;
        this.direction = direction;
        this.updateTransformation();
        var center: TwoDPosition = this.getCenter();
        this.moveSensors(this.offsetPosition.x, this.offsetPosition.y, direction, center.x, center.y);
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

    private initDragAndDrop(): void {
        var robotItem = this;

        var startHandle = function () {
                this.cx = robotItem.rotationHandle.matrix.x(this.attr("cx"), this.attr("cy"));
                this.cy = robotItem.rotationHandle.matrix.y(this.attr("cx"), this.attr("cy"));
                return this;
            },
            moveHandle = function (dx, dy) {
                var newX : number = this.cx + dx * (1 / robotItem.worldModel.getZoom());
                var newY : number = this.cy + dy * (1 / robotItem.worldModel.getZoom());

                var center: TwoDPosition = robotItem.getCenter();
                var diffX : number = newX - center.x;
                var diffY : number = newY - center.y;
                var tan : number = diffY / diffX;
                var angle : number = Math.atan(tan) / (Math.PI / 180);
                if (diffX < 0) {
                    angle += 180;
                }

                robotItem.direction = angle;
                robotItem.updateTransformation();
                robotItem.updateSensorsTransformation();

                return this;
            },
            upHandle = function () {
                return this;
            };

        robotItem.rotationHandle.drag(moveHandle, startHandle, upHandle);

        var start = function (event) {
                if (!robotItem.worldModel.getDrawMode()) {
                    robotItem.worldModel.setCurrentElement(robotItem);
                    this.lastOffsetX = robotItem.offsetPosition.x;
                    this.lastOffsetY = robotItem.offsetPosition.y;
                }
                return this;
            },
            move = function (dx, dy) {
                robotItem.offsetPosition.x = this.lastOffsetX + dx * (1 / robotItem.worldModel.getZoom());
                robotItem.offsetPosition.y = this.lastOffsetY + dy * (1 / robotItem.worldModel.getZoom());
                robotItem.updateTransformation();
                var center: TwoDPosition = robotItem.getCenter();
                robotItem.moveSensors(robotItem.offsetPosition.x, robotItem.offsetPosition.y,
                    robotItem.direction, center.x, center.y);
                return this;
            },
            up = function () {
                return this;
            };

        this.image.drag(move, start, up);
    }

    private updateSensorsTransformation(): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.updateTransformation();
        }
    }

    private clearSensorsPosition(): void {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.setStartPosition();
            sensor.restoreStartDirection();
        }
    }

    private updateTransformation(): void {
        this.image.transform(this.getTransformation());
        this.rotationHandle.transform(this.getTransformation());
        var center: TwoDPosition = this.getCenter();
        if (this.isFollow) {
            this.scroller.scrollToPoint(center.x, center.y);
        }
    }

    private getTransformation(): string {
        var cx = this.startCenter.x + this.offsetPosition.x;
        var cy = this.startCenter.y + this.offsetPosition.y;
        return "T" + this.offsetPosition.x + "," + this.offsetPosition.y + "R" + this.direction + "," + cx + "," + cy;
    }

}