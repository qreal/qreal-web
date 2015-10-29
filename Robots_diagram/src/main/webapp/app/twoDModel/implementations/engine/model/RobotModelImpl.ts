/*
 * Copyright Vladimir Zakharov
 * Copyright Anton Gulikov
 * Copyright Lada Gagina
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

class RobotModelImpl implements RobotModel {
    private robotItem: RobotItem;
    private twoDRobotModel: TwoDRobotModel;
    private sensorsConfiguration: SensorsConfiguration;
    private position: TwoDPosition;
    private angle: number;
    private speed1: number;
    private speed2: number;
    private maxSpeed1 = 3;
    private maxSpeed2 = 3;
    private drawingState : boolean;

    constructor(worldModel: WorldModel, twoDRobotModel: TwoDRobotModel, position: TwoDPosition) {
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.sensorsConfiguration = new SensorsConfiguration(this);
        this.drawingState = false;
        this.position = new TwoDPosition(position.x, position.y);
        this.angle = 0;
        this.speed1 = 0;
        this.speed2 = 0;
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

    addSensorItem(portName: string, deviceType: DeviceInfo): void {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType));
    }

    setMotor1(power) {
        this.speed1 = this.maxSpeed1 * power / 100;
    }

    setMotor2(power) {
        this.speed2 = this.maxSpeed2 * power / 100;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    getAngle(): number {
        return this.angle;
    }

    /**
     * Set new position for car's Model
     * @param position
     */
    setPosition(position: TwoDPosition) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    /**
     * Change the value of drawing stage
     * @param newState
     */
    setDrawingState(newState : boolean) : void {
        this.drawingState = newState;
        this.robotItem.setDrawingState(newState);
    }

    /**
     * Update parameters for car's Model
     */
    recalculateParams(): void {
        var centerPosition = this.robotItem.getCurrentCenter();
        var angle = Utils.toRadian(this.robotItem.getAngle());
        this.position = centerPosition;
        this.angle = angle;
        var robotHeight = 50;
        var timeInterval = 1;
        var averageSpeed = (this.speed1 + this.speed2) / 2;
        if (this.speed1 != this.speed2) {
            var radius = this.speed1 * robotHeight / (this.speed1 - this.speed2);
            var averageRadius = radius - robotHeight / 2;
            var angularSpeed = 0;
            var actualRadius = 0;
            if (this.speed1 == -this.speed2) {
                angularSpeed = this.speed1 / radius;
                actualRadius = 0;  // Radius is relative to the center of the robot.
            } else {
                angularSpeed = averageSpeed / averageRadius;
                actualRadius = averageRadius;
            }
            var gammaRadians = timeInterval * angularSpeed;
            var gammaDegrees = Utils.toDegrees(gammaRadians);
            this.angle += gammaRadians;

            this.position.x += averageSpeed * Math.cos(this.angle);
            this.position.y += averageSpeed * Math.sin(this.angle);
        }
        else {
            this.position.x += averageSpeed * Math.cos(this.angle);
            this.position.y += averageSpeed * Math.sin(this.angle);
        }
        var pos :TwoDPosition = new TwoDPosition(this.position.x, this.position.y);
        this.robotItem.updateRobotLocation(pos, Utils.toDegrees(this.angle));
    }

    /**
     * Call methods for drawing new state at the paper
     */

    nextFragment(): void {
        this.robotItem.redraw();
    }
}