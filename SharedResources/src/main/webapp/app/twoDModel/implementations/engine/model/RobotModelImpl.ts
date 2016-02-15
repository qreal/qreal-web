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

/// <reference path="DisplayWidget.ts" />
/// <reference path="SensorsConfiguration.ts" />
/// <reference path="../Runner.ts" />
/// <reference path="../items/RobotItemImpl.ts" />
/// <reference path="../../robotModel/TwoDRobotModel.ts" />
/// <reference path="../../../interfaces/engine/model/RobotModel.ts" />
/// <reference path="../../../interfaces/engine/items/RobotItem.ts" />
/// <reference path="../../../interfaces/engine/model/WorldModel.ts" />
/// <reference path="../../../interfaces/robotModel/DeviceInfo.ts" />
/// <reference path="../../../types/TwoDPosition.ts" />

class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private sensorsConfiguration: SensorsConfiguration;
    private worldModel: WorldModel;
    private displayWidget: DisplayWidget;
    private runner: Runner;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.worldModel = worldModel;
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.sensorsConfiguration = new SensorsConfiguration(this);
        this.displayWidget = new DisplayWidget();
        this.runner = new Runner();
    }

    info(): TwoDRobotModel {
        return this.twoDRobotModel;
    }

    removeSensorItem(portName: string): void {
        this.robotItem.removeSensorItem(portName);
    }

    getSensorsConfiguration(): SensorsConfiguration {
        return this.sensorsConfiguration;
    }

    addSensorItem(portName: string, deviceType: DeviceInfo, position?: TwoDPosition, direction?: number): void {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType),
            position, direction);
    }

    private parsePositionString(positionStr: string): TwoDPosition {
        var splittedStr = positionStr.split(":");
        var x = parseFloat(splittedStr[0]);
        var y = parseFloat(splittedStr[1]);
        return new TwoDPosition(x, y);
    }

    deserialize(xml, offsetX: number, offsetY: number): void {
        var posString = xml.getAttribute('position');
        var pos = this.parsePositionString(posString);
        pos.x += offsetX;
        pos.y += offsetY;
        var direction = parseFloat(xml.getAttribute('direction'));
        this.robotItem.setStartPosition(pos, direction);
        this.robotItem.setOffsetX(offsetX);
        this.robotItem.setOffsetY(offsetY);
        this.robotItem.returnToStart();

        this.sensorsConfiguration.deserialize(xml);

        this.robotItem.show();
    }

    showCheckResult(result) {
        this.stopPlay();
        this.runner.run(this.robotItem, this.displayWidget, result);
    }

    stopPlay(): void {
        this.runner.stop(this.robotItem, this.displayWidget);
        this.robotItem.clearCurrentPosition();
        this.robotItem.returnToStart();
    }

    closeDisplay(): void {
        this.displayWidget.hide();
    }

    showDisplay(): void {
        this.displayWidget.show();
    }

    follow(value: boolean) {
        this.robotItem.follow(value);
    }

}