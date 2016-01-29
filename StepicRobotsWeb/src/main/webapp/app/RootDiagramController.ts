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

/// <reference path="twoDModel/interfaces/robotModel/CommonRobotModel.ts" />
/// <reference path="twoDModel/implementations/robotModel/TwoDRobotModel.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/TrikRobotModelBase.ts" />

class RootDiagramController {
    private realModel: CommonRobotModel;
    private robotModel: TwoDRobotModel;

    constructor($scope, $compile) {
        $scope.root = this;

        this.realModel = new TrikRobotModelBase();
        this.robotModel = new TwoDRobotModel(this.realModel, "model");

        $scope.$on("emitDisplayResult", (event, result) => {
            $scope.$broadcast("displayResult", result);
        });

        $scope.$on("emitCheckingResult", (event, result) => {
            $scope.$broadcast("displayCheckingResult", result);
        });

        $scope.$on("emit2dModelLoad", (event, fieldXML) => {
            $scope.$broadcast("2dModelLoad", fieldXML);
        });
    }

    setRobotModel(robotModel: TwoDRobotModel) {
        this.robotModel = robotModel;
    }

    getRobotModel(): TwoDRobotModel {
        return this.robotModel;
    }
}