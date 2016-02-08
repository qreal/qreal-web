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

/// <reference path="model/ModelImpl.ts" />
/// <reference path="../robotModel/TwoDRobotModel.ts" />
/// <reference path="../robotModel/DeviceInfoImpl.ts" />
/// <reference path="../../interfaces/engine/model/Model.ts" />

class TwoDModelEngineFacadeImpl implements TwoDModelEngineFacade {
    private robotModelName: string;
    private model: Model;

    constructor($scope, $compile, $attrs) {
        $scope.vm = this;

        var facade = this;
        var robotModel = new TwoDRobotModel(new TrikRobotModelBase(), "model");
        this.robotModelName = robotModel.getName();

        this.model = new ModelImpl();
        this.model.addRobotModel(robotModel);

        $(document).ready(() => {
            $('#confirmDelete').find('.modal-footer #confirm').on('click', function(){
                facade.model.getWorldModel().clearPaper();
                $('#confirmDelete').modal('hide');
            });

            this.initPortsConfigation($scope, $compile, robotModel);
            this.makeUnselectable(document.getElementById("twoDModelContent"));
        });

        $scope.$on("displayResult", (event, result) => {
            this.showCheckResult(result);
        });

        $scope.$on("displayCheckingResult", (event, result) => {
            this.displayResult(result);
        });

        $scope.$on("2dModelLoad", (event, fieldXML) => {
            this.model.deserialize($.parseXML(fieldXML));
        });

        $("#infoAlert").hide();
        $(".close").click(function () {
            $(this).parent().hide();
        })
    }

    private makeUnselectable(element) {
        if (element.nodeType == 1) {
            element.setAttribute("unselectable", "on");
        }
        var child = element.firstChild;
        while (child) {
            this.makeUnselectable(child);
            child = child.nextSibling;
        }
    }

    private displayResult(result): void {
        this.model.getWorldModel().clearPaper();
        this.model.deserialize($.parseXML(result.fieldXML));
        $("#twoDModelContent").show();
        this.showCheckResult(result);
    }

    setDrawLineMode(): void {
        this.model.getWorldModel().setDrawLineMode();
    }

    setDrawWallMode(): void {
        this.model.getWorldModel().setDrawWallMode();
    }

    setDrawPencilMode(): void {
        this.model.getWorldModel().setDrawPencilMode();
    }

    setDrawEllipseMode(): void {
        this.model.getWorldModel().setDrawEllipseMode();
    }

    setNoneMode(): void {
        this.model.getWorldModel().setNoneMode();
    }

    openDiagram(): void {
        $("#twoDModelContent").hide();
        $("#diagramContent").show();
    }

    initPortsConfigation($scope, $compile, twoDRobotModel: TwoDRobotModel): void {
        var configurationDropdownsContent = "<p>";
        twoDRobotModel.getConfigurablePorts().forEach(function(port) {
            var portName = port.getName();
            var id = portName + "Select";
            configurationDropdownsContent += "<p>";
            configurationDropdownsContent += portName + " ";
            configurationDropdownsContent += "<select id='" + id + "' style='width: 150px'>";
            configurationDropdownsContent += "<option value='Unused'>Unused</option>";
            var devices = twoDRobotModel.getAllowedDevices(port);
            devices.forEach(function (device) {
                configurationDropdownsContent += "<option value='" + device.getName() + "'>" + device.getFriendlyName(); + "</option>";
            });
            configurationDropdownsContent += "</select>";
            configurationDropdownsContent += "</p>";
        });
        configurationDropdownsContent += "</p>";
        $('#configurationDropdowns').append($compile(configurationDropdownsContent)($scope));
        this.setPortsSelectsListeners(twoDRobotModel);
    }

    setPortsSelectsListeners(twoDRobotModel: TwoDRobotModel): void {
        var facade = this;
        var sensorsConfiguration = facade.model.getRobotModels()[0].getSensorsConfiguration();
        twoDRobotModel.getConfigurablePorts().forEach(function(port) {
            var portName: string = port.getName();
            var htmlId = "#" + portName + "Select";

            $(htmlId).change(function() {
                var newValue: string = $(htmlId).val();
                switch (newValue) {
                    case "Unused":
                        sensorsConfiguration.removeSensor(portName);
                        break
                    default:
                        var device = DeviceInfoImpl.fromString(newValue);
                        sensorsConfiguration.addSensor(portName, device);
                }
            });
        });
    }

    showCheckResult(result): void {
        var robotModel = this.model.getRobotModels()[0];
        robotModel.showCheckResult(result);
    }

    stopPlay(): void {
        var robotModel = this.model.getRobotModels()[0];
        $("#infoAlert").hide();
        robotModel.stopPlay();
    }

    closeDisplay(): void {
        this.model.getRobotModels()[0].closeDisplay();
    }

    showDisplay(): void {
        this.model.getRobotModels()[0].showDisplay();
    }

    followRobot(): void {
        var robotModel = this.model.getRobotModels()[0];
        robotModel.follow(!$("#follow_button").hasClass('active'));
    }

}