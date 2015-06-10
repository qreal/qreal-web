class TwoDModelEngineFacadeImpl implements TwoDModelEngineFacade {
    private robotModelName: string;
    private model: Model;

    constructor($scope, $compile, $attrs) {
        $scope.vm = this;

        var facade = this;
        var robotModel = $scope.root.getRobotModel();
        this.robotModelName = robotModel.getName();

        this.model = new ModelImpl();

        this.model.addRobotModel(robotModel);

        var taskId = $attrs.task;

        $(document).ready(function() {
            $('#confirmDelete').find('.modal-footer #confirm').on('click', function(){
                facade.model.getWorldModel().clearPaper();
                $('#confirmDelete').modal('hide');
            });

            facade.initPortsConfigation($scope, $compile, robotModel);
            facade.makeUnselectable(document.getElementById("twoDModelContent"));
        });

        $scope.$on("DisplayTrace", function(event, traceJson) {
            facade.displayTrace(traceJson);
        });

        $scope.$on("2dModelLoad", function(event) {
            facade.load("tasks/" + taskId + "/diagram/metaInfo.xml");
        });

        $compile($("#stop_button"))($scope);
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

    load(pathToXML: string): void {
        var facade = this;
        var req: any = XmlHttpFactory.createXMLHTTPObject();
        if (!req) {
            alert("Can't load xml document!");
            return null;
        }

        req.open("GET", pathToXML, true);
        req.onreadystatechange = function() {
            facade.xmlLoadReady(req);
        };
        req.send(null);
    }

    private xmlLoadReady(request): void {
        try {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var responseXml = request.responseXML;
                    var worldModelXml;
                    var infos = responseXml.getElementsByTagName("info");
                    for (var i = 0; i < infos.length; i++) {
                        if (infos[i].getAttribute("key") === "worldModel") {
                            worldModelXml = infos[i].getAttribute("value");
                            break;
                        }
                    }
                    this.model.deserialize($.parseXML(worldModelXml));
                } else {
                    alert("Can't load 2d model:\n" + request.statusText);
                }
            }
        } catch(e) {
            alert("Error: " + e.message);
        }
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

    displayTrace(traceJson): void {
        var robotModel = this.model.getRobotModels()[0];
        robotModel.rideTrace(traceJson);
    }

    stopPlay(): void {
        var robotModel = this.model.getRobotModels()[0];
        robotModel.stopPlay();
    }
}