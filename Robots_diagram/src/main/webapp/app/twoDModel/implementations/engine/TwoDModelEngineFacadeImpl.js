var TwoDModelEngineFacadeImpl = (function () {
    function TwoDModelEngineFacadeImpl($scope, $compile) {
        $scope.vm = this;
        var facade = this;
        var robotModel = $scope.root.getRobotModel();
        this.robotModelName = robotModel.getName();
        this.model = new ModelImpl();
        this.model.addRobotModel(robotModel);
        $(document).ready(function () {
            $('#confirmDelete').find('.modal-footer #confirm').on('click', function () {
                facade.model.getWorldModel().clearPaper();
                $('#confirmDelete').modal('hide');
            });
            facade.initPortsConfigation($scope, $compile, robotModel);
            facade.makeUnselectable(document.getElementById("twoDModelContent"));
        });
    }
    TwoDModelEngineFacadeImpl.prototype.makeUnselectable = function (element) {
        if (element.nodeType == 1) {
            element.setAttribute("unselectable", "on");
        }
        var child = element.firstChild;
        while (child) {
            this.makeUnselectable(child);
            child = child.nextSibling;
        }
    };
    TwoDModelEngineFacadeImpl.prototype.setDrawLineMode = function () {
        this.model.getWorldModel().setDrawLineMode();
    };
    TwoDModelEngineFacadeImpl.prototype.setDrawWallMode = function () {
        this.model.getWorldModel().setDrawWallMode();
    };
    TwoDModelEngineFacadeImpl.prototype.setDrawPencilMode = function () {
        this.model.getWorldModel().setDrawPencilMode();
    };
    TwoDModelEngineFacadeImpl.prototype.setDrawEllipseMode = function () {
        this.model.getWorldModel().setDrawEllipseMode();
    };
    TwoDModelEngineFacadeImpl.prototype.setNoneMode = function () {
        this.model.getWorldModel().setNoneMode();
    };
    TwoDModelEngineFacadeImpl.prototype.openDiagram = function () {
        $("#twoDModelContent").hide();
        $("#diagramContent").show();
    };
    TwoDModelEngineFacadeImpl.prototype.initPortsConfigation = function ($scope, $compile, twoDRobotModel) {
        var configurationDropdownsContent = "<p>";
        twoDRobotModel.getConfigurablePorts().forEach(function (port) {
            var portName = port.getName();
            var id = portName + "Select";
            configurationDropdownsContent += "<p>";
            configurationDropdownsContent += portName + " ";
            configurationDropdownsContent += "<select id='" + id + "' style='width: 150px'>";
            configurationDropdownsContent += "<option value='Unused'>Unused</option>";
            var devices = twoDRobotModel.getAllowedDevices(port);
            devices.forEach(function (device) {
                configurationDropdownsContent += "<option value='" + device.getName() + "'>" + device.getFriendlyName();
                +"</option>";
            });
            configurationDropdownsContent += "</select>";
            configurationDropdownsContent += "</p>";
        });
        configurationDropdownsContent += "</p>";
        $('#configurationDropdowns').append($compile(configurationDropdownsContent)($scope));
        this.setPortsSelectsListeners(twoDRobotModel);
    };
    TwoDModelEngineFacadeImpl.prototype.setPortsSelectsListeners = function (twoDRobotModel) {
        var facade = this;
        var sensorsConfiguration = facade.model.getRobotModels()[0].getSensorsConfiguration();
        twoDRobotModel.getConfigurablePorts().forEach(function (port) {
            var portName = port.getName();
            var htmlId = "#" + portName + "Select";
            $(htmlId).change(function () {
                var newValue = $(htmlId).val();
                switch (newValue) {
                    case "Unused":
                        sensorsConfiguration.removeSensor(portName);
                        break;
                    default:
                        var device = DeviceInfoImpl.fromString(newValue);
                        sensorsConfiguration.addSensor(portName, device);
                }
            });
        });
    };
    return TwoDModelEngineFacadeImpl;
})();
//# sourceMappingURL=TwoDModelEngineFacadeImpl.js.map