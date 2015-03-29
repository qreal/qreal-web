class RootDiagramController {
    private realModel: CommonRobotModel;
    private robotModel: TwoDRobotModel;

    constructor($scope, $compile) {
        $scope.root = this;
        var controller = this;

        this.realModel = new TrikRobotModelBase();
        this.robotModel = new TwoDRobotModel(this.realModel, "model");

        $(document).ready(function() {
            controller.initPortsConfigation($scope, $compile);
        });
    }

    setRobotModel(robotModel: TwoDRobotModel) {
        this.robotModel = robotModel;
    }

    getRobotModel(): TwoDRobotModel {
        return this.robotModel;
    }

    initPortsConfigation($scope, $compile): void {
        var configurationDropdownsContent = "<p>";
        var controller = this;
        controller.realModel.getConfigurablePorts().forEach(function(port) {
            var portName = port.getName();
            var id = portName + "Select";
            configurationDropdownsContent += "<p>";
            configurationDropdownsContent += portName + " ";
            configurationDropdownsContent += "<select id='" + id + "' style='width: 150px'>";
            configurationDropdownsContent += "<option value='Unused'>Unused</option>";
            var devices = controller.realModel.getAllowedDevices(port);
            devices.forEach(function (device) {
                var friendlyName = device.getFriendlyName();
                configurationDropdownsContent += "<option value='" + friendlyName + "'>" + friendlyName + "</option>";
            });
            configurationDropdownsContent += "</select>";
            configurationDropdownsContent += "</p>";
        });
        configurationDropdownsContent += "</p>";
        $('#configurationDropdowns').append($compile(configurationDropdownsContent)($scope));
        this.setPortsSelectsListeners();
    }

    setPortsSelectsListeners(): void {
        this.realModel.getConfigurablePorts().forEach(function(port) {
            var htmlId = "#" + port.getName() + "Select";
            //TODO: implement listener
            $(htmlId).change(function() {
                console.log($(htmlId).val());
            });
        });
    }
}