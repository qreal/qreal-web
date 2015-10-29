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

class TwoDRobotModel extends CommonRobotModelImpl {
    private name: string;
    private image: string;
    private realModel: RobotModelInterface;

    constructor(realModel: RobotModelInterface, name: string) {
        super();
        var twoDRobotModel = this;
        this.realModel = realModel;
        this.name = name;
        this.image = "images/2dmodel/trikKit/trikTwoDRobot.svg";

        realModel.getAvailablePorts().forEach(function(port) {
            twoDRobotModel.addAllowedConnection(port, realModel.getAllowedDevices(port));
        });

        ImagePreloader.preloadImages(["images/2dmodel/trikKit/twoDColorEmpty.svg",
            "images/2dmodel/trikKit/twoDIrRangeSensor.svg",
            "images/2dmodel/trikKit/twoDUsRangeSensor.svg",
            "images/2dmodel/trikKit/twoDVideoModule.svg"]);
    }

    sensorImagePath(deviceType: DeviceInfo): string {
        if (deviceType.isA(LightSensor)) {
            return "images/2dmodel/trikKit/twoDColorEmpty.svg";
        } else if (deviceType.isA(TrikInfraredSensor)) {
            return "images/2dmodel/trikKit/twoDIrRangeSensor.svg";
        } else if (deviceType.isA(TrikSonarSensor)) {
            return "images/2dmodel/trikKit/twoDUsRangeSensor.svg";
        } else if (deviceType.isA(TrikLineSensor)) {
            return "images/2dmodel/trikKit/twoDVideoModule.svg";
        }

        return null;
    }

    getName(): string {
        return this.name;
    }

    getRobotImage(): string {
        return this.image;
    }

    getConfigurablePorts(): PortInfo[] {
        return this.realModel.getConfigurablePorts();
    }
}