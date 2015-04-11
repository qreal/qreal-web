var DeviceImpl = (function () {
    function DeviceImpl() {
    }
    return DeviceImpl;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractSensor = (function (_super) {
    __extends(AbstractSensor, _super);
    function AbstractSensor() {
        _super.apply(this, arguments);
    }
    AbstractSensor.parentType = DeviceImpl;
    return AbstractSensor;
})(DeviceImpl);
var ScalarSensor = (function (_super) {
    __extends(ScalarSensor, _super);
    function ScalarSensor() {
        _super.apply(this, arguments);
    }
    ScalarSensor.parentType = AbstractSensor;
    return ScalarSensor;
})(AbstractSensor);
var VectorSensor = (function (_super) {
    __extends(VectorSensor, _super);
    function VectorSensor() {
        _super.apply(this, arguments);
    }
    VectorSensor.parentType = AbstractSensor;
    return VectorSensor;
})(AbstractSensor);
var AccelerometerSensor = (function (_super) {
    __extends(AccelerometerSensor, _super);
    function AccelerometerSensor() {
        _super.apply(this, arguments);
    }
    AccelerometerSensor.parentType = ScalarSensor;
    AccelerometerSensor.name = "accelerometer";
    AccelerometerSensor.friendlyName = "Accelerometer";
    return AccelerometerSensor;
})(ScalarSensor);
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.parentType = ScalarSensor;
    Button.name = "button";
    Button.friendlyName = "Button";
    return Button;
})(ScalarSensor);
var ColorSensor = (function (_super) {
    __extends(ColorSensor, _super);
    function ColorSensor() {
        _super.apply(this, arguments);
    }
    ColorSensor.parentType = ScalarSensor;
    ColorSensor.name = "color";
    ColorSensor.friendlyName = "Color sensor";
    return ColorSensor;
})(ScalarSensor);
var ColorSensorBlue = (function (_super) {
    __extends(ColorSensorBlue, _super);
    function ColorSensorBlue() {
        _super.apply(this, arguments);
    }
    ColorSensorBlue.parentType = ColorSensor;
    ColorSensorBlue.name = "colorBlue";
    ColorSensorBlue.friendlyName = "Color sensor (blue)";
    return ColorSensorBlue;
})(ColorSensor);
var ColorSensorFull = (function (_super) {
    __extends(ColorSensorFull, _super);
    function ColorSensorFull() {
        _super.apply(this, arguments);
    }
    ColorSensorFull.parentType = ColorSensor;
    ColorSensorFull.name = "colorRecognition";
    ColorSensorFull.friendlyName = "Color sensor (full)";
    return ColorSensorFull;
})(ColorSensor);
var ColorSensorGreen = (function (_super) {
    __extends(ColorSensorGreen, _super);
    function ColorSensorGreen() {
        _super.apply(this, arguments);
    }
    ColorSensorGreen.parentType = ColorSensor;
    ColorSensorGreen.name = "colorGreen";
    ColorSensorGreen.friendlyName = "Color sensor (green)";
    return ColorSensorGreen;
})(ColorSensor);
var ColorSensorPassive = (function (_super) {
    __extends(ColorSensorPassive, _super);
    function ColorSensorPassive() {
        _super.apply(this, arguments);
    }
    ColorSensorPassive.parentType = ColorSensor;
    ColorSensorPassive.name = "colorNone";
    ColorSensorPassive.friendlyName = "Color sensor (passive)";
    return ColorSensorPassive;
})(ColorSensor);
var ColorSensorRed = (function (_super) {
    __extends(ColorSensorRed, _super);
    function ColorSensorRed() {
        _super.apply(this, arguments);
    }
    ColorSensorRed.parentType = ColorSensor;
    ColorSensorRed.name = "colorRed";
    ColorSensorRed.friendlyName = "Color sensor (red)";
    return ColorSensorRed;
})(ColorSensor);
var Display = (function (_super) {
    __extends(Display, _super);
    function Display() {
        _super.apply(this, arguments);
    }
    Display.parentType = DeviceImpl;
    Display.name = "display";
    Display.friendlyName = "Display";
    return Display;
})(DeviceImpl);
var EncoderSensor = (function (_super) {
    __extends(EncoderSensor, _super);
    function EncoderSensor() {
        _super.apply(this, arguments);
    }
    EncoderSensor.parentType = ScalarSensor;
    EncoderSensor.name = "encoder";
    EncoderSensor.friendlyName = "Encoder";
    return EncoderSensor;
})(ScalarSensor);
var GyroscopeSensor = (function (_super) {
    __extends(GyroscopeSensor, _super);
    function GyroscopeSensor() {
        _super.apply(this, arguments);
    }
    GyroscopeSensor.parentType = ScalarSensor;
    GyroscopeSensor.name = "gyroscope";
    GyroscopeSensor.friendlyName = "Gyroscope";
    return GyroscopeSensor;
})(ScalarSensor);
var LightSensor = (function (_super) {
    __extends(LightSensor, _super);
    function LightSensor() {
        _super.apply(this, arguments);
    }
    LightSensor.parentType = ScalarSensor;
    LightSensor.name = "light";
    LightSensor.friendlyName = "Light sensor";
    return LightSensor;
})(ScalarSensor);
var Motor = (function (_super) {
    __extends(Motor, _super);
    function Motor() {
        _super.apply(this, arguments);
    }
    Motor.parentType = DeviceImpl;
    Motor.name = "motor";
    Motor.friendlyName = "Motor";
    return Motor;
})(DeviceImpl);
var RangeSensor = (function (_super) {
    __extends(RangeSensor, _super);
    function RangeSensor() {
        _super.apply(this, arguments);
    }
    RangeSensor.parentType = ScalarSensor;
    RangeSensor.name = "sonar";
    RangeSensor.friendlyName = "Range sensor";
    return RangeSensor;
})(ScalarSensor);
var SoundSensor = (function (_super) {
    __extends(SoundSensor, _super);
    function SoundSensor() {
        _super.apply(this, arguments);
    }
    SoundSensor.parentType = ScalarSensor;
    SoundSensor.name = "sound";
    SoundSensor.friendlyName = "Sound sensor";
    return SoundSensor;
})(ScalarSensor);
var Speaker = (function (_super) {
    __extends(Speaker, _super);
    function Speaker() {
        _super.apply(this, arguments);
    }
    Speaker.parentType = DeviceImpl;
    Speaker.name = "speaker";
    Speaker.friendlyName = "Speaker";
    return Speaker;
})(DeviceImpl);
var TouchSensor = (function (_super) {
    __extends(TouchSensor, _super);
    function TouchSensor() {
        _super.apply(this, arguments);
    }
    TouchSensor.parentType = ScalarSensor;
    TouchSensor.name = "touch";
    TouchSensor.friendlyName = "Touch sensor";
    return TouchSensor;
})(ScalarSensor);
var CommonRobotModelImpl = (function () {
    function CommonRobotModelImpl() {
        this.ports = [];
        this.allowedConnections = {};
    }
    CommonRobotModelImpl.prototype.getAvailablePorts = function () {
        return this.ports;
    };
    CommonRobotModelImpl.prototype.addAllowedConnection = function (port, devices) {
        this.ports.push(port);
        this.allowedConnections[this.ports.indexOf(port)] = devices;
    };
    CommonRobotModelImpl.prototype.getConfigurablePorts = function () {
        var result = [];
        var robotModel = this;
        robotModel.getAvailablePorts().forEach(function (port) {
            var devices = robotModel.getAllowedDevices(port);
            if (devices.length > 1) {
                result.push(port);
            }
        });
        return result;
    };
    CommonRobotModelImpl.prototype.getAllowedDevices = function (port) {
        return this.allowedConnections[this.ports.indexOf(port)];
    };
    return CommonRobotModelImpl;
})();
var DevicesConfigurationProvider = (function () {
    function DevicesConfigurationProvider() {
        this.currentConfiguration = {};
    }
    DevicesConfigurationProvider.prototype.deviceConfigurationChanged = function (robotModelName, portName, device) {
        if (!this.currentConfiguration[robotModelName]) {
            this.currentConfiguration[robotModelName] = {};
        }
        if (device == null) {
            if (this.currentConfiguration[robotModelName][portName]) {
                delete this.currentConfiguration[robotModelName][portName];
            }
        }
        else {
            this.currentConfiguration[robotModelName][portName] = device;
        }
    };
    DevicesConfigurationProvider.prototype.getCurrentConfiguration = function (robotModelName, portName) {
        if (!this.currentConfiguration[robotModelName] || !this.currentConfiguration[robotModelName][portName]) {
            return null;
        }
        return this.currentConfiguration[robotModelName][portName];
    };
    return DevicesConfigurationProvider;
})();
var RootDiagramController = (function () {
    function RootDiagramController($scope, $compile) {
        $scope.root = this;
        this.realModel = new TrikRobotModelBase();
        this.robotModel = new TwoDRobotModel(this.realModel, "model");
    }
    RootDiagramController.prototype.setRobotModel = function (robotModel) {
        this.robotModel = robotModel;
    };
    RootDiagramController.prototype.getRobotModel = function () {
        return this.robotModel;
    };
    return RootDiagramController;
})();
var XmlHttpFactory = (function () {
    function XmlHttpFactory() {
    }
    XmlHttpFactory.createXMLHTTPObject = function () {
        var xmlHttp = undefined;
        for (var i = 0; i < this.XMLHttpFactories.length; i++) {
            try {
                xmlHttp = this.XMLHttpFactories[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlHttp;
    };
    XmlHttpFactory.XMLHttpFactories = [
        function () {
            return new XMLHttpRequest();
        },
        function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    ];
    return XmlHttpFactory;
})();
var DiagramController = (function () {
    function DiagramController($scope, $compile) {
        this.graph = new joint.dia.Graph;
        this.paper = new DiagramPaper(this.graph);
        this.nodeTypesMap = {};
        this.nodesList = {};
        this.nodeIndex = -1;
        var controller = this;
        $scope.vm = controller;
        XmlManager.loadElementsFromXml(this, "configs/elements.xml", $scope, $compile);
        this.paper.on('cell:pointerdown', function (cellView, evt, x, y) {
            console.log('cell view ' + cellView.model.id + ' was clicked');
            var node = controller.nodesList[cellView.model.id];
            if (node) {
                controller.currentNode = node;
                controller.setNodeProperties(node);
            }
            else {
                controller.currentNode = undefined;
            }
        });
        this.paper.on('blank:pointerdown', function (evt, x, y) {
            console.log('blank was clicked');
            $(".property").remove();
            controller.currentNode = undefined;
        });
    }
    DiagramController.prototype.setNodeTypesMap = function (nodeTypesMap) {
        this.nodeTypesMap = nodeTypesMap;
    };
    DiagramController.prototype.makeUnselectable = function (element) {
        if (element.nodeType == 1) {
            element.setAttribute("unselectable", "on");
        }
        var child = element.firstChild;
        while (child) {
            this.makeUnselectable(child);
            child = child.nextSibling;
        }
    };
    DiagramController.prototype.initPalette = function () {
        this.setInputStringListener();
        this.setCheckboxListener();
        this.setDropdownListener();
        this.setSpinnerListener();
        this.initDragAndDrop();
        this.makeUnselectable(document.getElementById("diagramContent"));
    };
    DiagramController.prototype.setInputStringListener = function () {
        var controller = this;
        $(document).on('change', '.form-control', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    };
    DiagramController.prototype.setCheckboxListener = function () {
        var controller = this;
        $(document).on('change', '.checkbox', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var label = tr.find('label');
            var value = label.contents().last()[0].textContent;
            if (value === "True") {
                value = "False";
                label.contents().last()[0].textContent = value;
            }
            else {
                value = "True";
                label.contents().last()[0].textContent = value;
            }
            var property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    };
    DiagramController.prototype.setDropdownListener = function () {
        var controller = this;
        $(document).on('change', '.mydropdown', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    };
    DiagramController.prototype.setSpinnerListener = function () {
        var controller = this;
        $(document).on('change', '.spinner', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property = controller.currentNode.getProperties()[name];
                property.value = value;
                controller.currentNode.setProperty(name, property);
            }
        });
    };
    DiagramController.prototype.initDragAndDrop = function () {
        var controller = this;
        $(".tree_element").draggable({
            helper: function () {
                var clone = $(this).find('.elementImg').clone();
                clone.css('position', 'fixed');
                clone.css('z-index', '1000');
                return clone;
            },
            revert: "invalid"
        });
        $("#diagram_paper").droppable({
            drop: function (event, ui) {
                var topElementPos = ui.offset.top - $(this).offset().top + $(this).scrollTop();
                var leftElementPos = ui.offset.left - $(this).offset().left + $(this).scrollLeft();
                var gridSize = controller.paper.getGridSizeValue();
                topElementPos -= topElementPos % gridSize;
                leftElementPos -= leftElementPos % gridSize;
                var type = $(ui.draggable.context).text();
                var image = controller.nodeTypesMap[type].image;
                var properties = controller.nodeTypesMap[type].properties;
                var node = controller.createDefaultNode(type, leftElementPos, topElementPos, properties, image);
                controller.currentNode = node;
                controller.setNodeProperties(node);
            }
        });
    };
    DiagramController.prototype.setNodeProperties = function (node) {
        var properties = node.getProperties();
        var content = '';
        for (var property in properties) {
            content += this.getPropertyHtml(node.getType(), property, properties[property]);
        }
        $('#property_table tbody').html(content);
    };
    DiagramController.prototype.getPropertyHtml = function (typeName, propertyName, property) {
        return PropertyManager.getPropertyHtml(typeName, propertyName, property);
    };
    DiagramController.prototype.createDefaultNode = function (type, x, y, properties, image) {
        this.nodeIndex++;
        var name = "Node" + this.nodeIndex;
        var node = new DefaultDiagramNode(name, type, x, y, properties, image);
        this.nodesList[node.getElement().id] = node;
        this.graph.addCell(node.getElement());
        return node;
    };
    DiagramController.prototype.clear = function () {
        this.graph.clear();
        this.nodeIndex = -1;
        this.nodesList = {};
        $(".property").remove();
        this.currentNode = undefined;
    };
    DiagramController.prototype.removeCurrentElement = function () {
        if (this.currentNode) {
            console.log("Node was deleted");
            delete this.nodesList[this.currentNode.getElement().id];
            this.currentNode.getElement().remove();
            $(".property").remove();
            this.currentNode = undefined;
        }
    };
    DiagramController.prototype.saveDiagram = function () {
        var name = prompt("input name");
        console.log(ExportManager.exportDiagramStateToJSON(this.graph, name, this.nodeIndex, this.nodesList));
        $.ajax({
            type: 'POST',
            url: 'save',
            dataType: 'json',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramStateToJSON(this.graph, name, this.nodeIndex, this.nodesList)),
            success: function (response) {
                console.log(response.message);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    };
    DiagramController.prototype.openDiagram = function () {
        var controller = this;
        var name = prompt("input diagram name");
        $.ajax({
            type: 'POST',
            url: 'open',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({ name: name })),
            success: function (response) {
                controller.clear();
                controller.nodeIndex = ImportManager.import(response, controller.graph, controller.nodesList);
                console.log(response.nodeIndex);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    };
    DiagramController.prototype.openTwoDModel = function () {
        $("#diagramContent").hide();
        $("#twoDModelContent").show();
    };
    return DiagramController;
})();
var DropdownListManager = (function () {
    function DropdownListManager() {
    }
    DropdownListManager.addDropdownList = function (typeName, propertyName, list) {
        if (!this.nodeDropdowns[typeName]) {
            this.nodeDropdowns[typeName] = {};
        }
        this.nodeDropdowns[typeName][propertyName] = list;
    };
    DropdownListManager.getDropdownList = function (typeName, propertyName) {
        return this.nodeDropdowns[typeName][propertyName];
    };
    DropdownListManager.nodeDropdowns = {};
    return DropdownListManager;
})();
var ExportManager = (function () {
    function ExportManager() {
    }
    ExportManager.exportVertices = function (vertices) {
        var count = 1;
        var newVertices = [];
        vertices.forEach(function (vertex) {
            newVertices.push({
                x: vertex.x,
                y: vertex.y,
                number: count
            });
            count++;
        });
        return newVertices;
    };
    ExportManager.exportDiagramStateToJSON = function (graph, name, nodeIndex, nodesList) {
        var json = {
            'name': name,
            'nodeIndex': nodeIndex,
            'nodes': [],
            'links': []
        };
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node = nodesList[id];
                var newNode = {
                    'name': node.getName(),
                    'type': node.getType(),
                    'x': node.getX(),
                    'y': node.getY(),
                    'image': node.getImagePath(),
                    'properties': []
                };
                var properties = node.getProperties();
                var position = 1;
                for (var propertyName in properties) {
                    var property = {
                        'name': propertyName,
                        'value': properties[propertyName].value,
                        'type': properties[propertyName].type,
                        'position': position
                    };
                    newNode.properties.push(property);
                    position++;
                }
                json.nodes.push(newNode);
            }
        }
        graph.getLinks().forEach(function (link) {
            console.log(link.get('target'));
            var src = nodesList[link.get('source').id].getName();
            var target = nodesList[link.get('target').id].getName();
            var vertices;
            if (link.get('vertices')) {
                vertices = ExportManager.exportVertices(link.get('vertices'));
            }
            var newLink = {
                'source': src,
                'target': target,
                'vertices': vertices
            };
            json.links.push(newLink);
        });
        return JSON.stringify(json);
    };
    return ExportManager;
})();
var ImportManager = (function () {
    function ImportManager() {
    }
    ImportManager.import = function (response, graph, nodesList) {
        console.log("import diagram");
        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var properties = {};
            var propertiesObject = nodeObject.properties;
            for (var j = 0; j < propertiesObject.length; j++) {
                var property = new Property(propertiesObject[j].value, propertiesObject[j].type);
                properties[propertiesObject[j].name] = property;
            }
            this.importNode(graph, nodesList, nodeObject.name, nodeObject.type, nodeObject.x, nodeObject.y, properties, nodeObject.image);
        }
        for (var i = 0; i < response.links.length; i++) {
            var linkObject = response.links[i];
            this.importLink(graph, nodesList, linkObject.source, linkObject.target, linkObject.vertices);
        }
        return response.nodeIndex;
    };
    ImportManager.importNode = function (graph, nodesList, name, type, x, y, properties, image) {
        var node = new DefaultDiagramNode(name, type, x, y, properties, image);
        nodesList[node.getElement().id] = node;
        graph.addCell(node.getElement());
    };
    ImportManager.importLink = function (graph, nodesList, sourceNodeId, targetNodeId, vertices) {
        var sourceId = this.getElementIdByNodeId(nodesList, sourceNodeId);
        var targetId = this.getElementIdByNodeId(nodesList, targetNodeId);
        var newVertices = this.importVertices(vertices);
        var link = new joint.dia.Link({
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: sourceId },
            target: { id: targetId },
            vertices: newVertices
        });
        graph.addCell(link);
    };
    ImportManager.importVertices = function (vertices) {
        var newVertices = [];
        vertices.forEach(function (vertex) {
            newVertices.push({
                x: vertex.x,
                y: vertex.y
            });
        });
        return newVertices;
    };
    ImportManager.getElementIdByNodeId = function (nodesList, nodeId) {
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node = nodesList[id];
                if (node.getName() === nodeId) {
                    return id;
                }
            }
        }
        return undefined;
    };
    return ImportManager;
})();
var PropertyManager = (function () {
    function PropertyManager() {
    }
    PropertyManager.getPropertyHtml = function (typeName, propertyName, property) {
        switch (property.type) {
            case "string":
                return this.getHtmlForString(propertyName, property);
            case "checkbox":
                return this.getHtmlForCheckBox(propertyName, property);
            case "dropdown":
                return this.getHtmlForDropdown(typeName, propertyName, property);
            case "spinner":
                return this.getHtmlForSpinner(propertyName, property);
            default:
                return undefined;
        }
    };
    PropertyManager.getHtmlForString = function (propertyName, property) {
        var content = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><div class="input-group">';
        content += '<input type="text" class="form-control" value="' + property.value + '">';
        content += '</div></td></tr>';
        return content;
    };
    PropertyManager.getHtmlForCheckBox = function (propertyName, property) {
        var content = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><div class="checkbox">';
        var state = "";
        if (property.value === "True") {
            state = "checked";
        }
        content += '<label class="active"><input type="checkbox" ' + state + ' >' + property.value + '</label>';
        content += '</div></td></tr>';
        return content;
    };
    PropertyManager.getHtmlForDropdown = function (typeName, propertyName, property) {
        var content = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><select class="mydropdown">';
        var dropdownList = DropdownListManager.getDropdownList(typeName, propertyName);
        for (var i in dropdownList) {
            var variant = dropdownList[i];
            var selected = "";
            if (variant === property.value) {
                selected = 'selected = "selected" ';
            }
            content += '<option ' + selected + 'value="' + variant + '">' + variant + '</option>';
        }
        content += '</select></td></tr>';
        return content;
    };
    PropertyManager.getHtmlForSpinner = function (propertyName, property) {
        var content = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><input type="number" class="spinner" value="' + property.value + '">';
        content += '</td></tr>';
        return content;
    };
    return PropertyManager;
})();
var XmlManager = (function () {
    function XmlManager() {
    }
    XmlManager.loadElementsFromXml = function (controller, pathToXML, $scope, $compile) {
        var req = XmlHttpFactory.createXMLHTTPObject();
        if (!req) {
            alert("Can't load xml document!");
            return null;
        }
        req.open("GET", pathToXML, true);
        req.onreadystatechange = function () {
            XmlManager.parseElementsXml(req, controller, $scope, $compile);
        };
        req.send(null);
    };
    XmlManager.addDropdownList = function (typeName, propertyName, variants) {
        var list = [];
        for (var i = 0; i < variants.length; i++) {
            list.push(variants[i].childNodes[0].nodeValue);
        }
        DropdownListManager.addDropdownList(typeName, propertyName, list);
    };
    XmlManager.parseElementsXml = function (req, controller, $scope, $compile) {
        try {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var xmlDoc = req.responseXML;
                    var nodeTypesMap = {};
                    var content = '';
                    var categories = xmlDoc.getElementsByTagName("Category");
                    for (var k = 0; k < categories.length; k++) {
                        content += '<li><p>' + categories[k].getAttribute('name') + '</p><ul>';
                        var elements = categories[k].getElementsByTagName("Element");
                        for (var i = 0; i < elements.length; i++) {
                            var typeName = elements[i].getAttribute('name');
                            nodeTypesMap[typeName] = new NodeType();
                            content += '<li><div class="tree_element">';
                            var elementProperties = elements[i].getElementsByTagName("Property");
                            var properties = {};
                            for (var j = 0; j < elementProperties.length; j++) {
                                var propertyName = elementProperties[j].getAttribute('name');
                                var propertyType = elementProperties[j].getAttribute('type');
                                if (propertyType === "dropdown") {
                                    this.addDropdownList(typeName, propertyName, elementProperties[j].getElementsByTagName("Variants")[0].getElementsByTagName("variant"));
                                }
                                var propertyValue;
                                var valueElement = elementProperties[j].getElementsByTagName("value")[0];
                                if (valueElement.childNodes[0]) {
                                    propertyValue = valueElement.childNodes[0].nodeValue;
                                }
                                else {
                                    propertyValue = '';
                                }
                                var property = new Property(propertyValue, propertyType);
                                properties[propertyName] = property;
                            }
                            var image = elements[i].getElementsByTagName("Image")[0].getAttribute('src');
                            nodeTypesMap[typeName].image = image;
                            nodeTypesMap[typeName].properties = properties;
                            content += '<img class="elementImg" src="' + image + '" width="30" height="30"' + '/>';
                            content += typeName;
                            content += '</div></li>';
                        }
                        content += '</ul></li>';
                    }
                    $('#navigation').append($compile(content)($scope));
                    $("#navigation").treeview({
                        persist: "location"
                    });
                    controller.setNodeTypesMap(nodeTypesMap);
                    controller.initPalette();
                }
                else {
                    alert("Can't load palette:\n" + req.statusText);
                }
            }
        }
        catch (e) {
            alert("Error: " + e.message);
        }
    };
    return XmlManager;
})();
var DefaultDiagramNode = (function () {
    function DefaultDiagramNode(name, type, x, y, properties, image) {
        this.name = name;
        this.text = 'Default';
        this.type = type;
        this.element = new joint.shapes.devs.ImageWithPorts({
            position: { x: x, y: y },
            size: { width: 50, height: 50 },
            outPorts: [''],
            attrs: {
                image: {
                    'xlink:href': image
                }
            }
        });
        this.properties = properties;
        this.image = image;
    }
    DefaultDiagramNode.prototype.setText = function (text) {
        this.text = text;
    };
    DefaultDiagramNode.prototype.getName = function () {
        return this.name;
    };
    DefaultDiagramNode.prototype.getType = function () {
        return this.type;
    };
    DefaultDiagramNode.prototype.getX = function () {
        return (this.element.get("position"))['x'];
    };
    DefaultDiagramNode.prototype.getY = function () {
        return (this.element.get("position"))['y'];
    };
    DefaultDiagramNode.prototype.getImagePath = function () {
        return this.image;
    };
    DefaultDiagramNode.prototype.getElement = function () {
        return this.element;
    };
    DefaultDiagramNode.prototype.setProperty = function (name, property) {
        this.properties[name] = property;
    };
    DefaultDiagramNode.prototype.getProperties = function () {
        return this.properties;
    };
    return DefaultDiagramNode;
})();
var DiagramPaper = (function (_super) {
    __extends(DiagramPaper, _super);
    function DiagramPaper(graph) {
        this.gridSizeValue = 25;
        _super.call(this, {
            el: $('#diagram_paper'),
            width: $('#diagram_paper').width(),
            height: $('#diagram_paper').height(),
            model: graph,
            gridSize: this.gridSizeValue,
            defaultLink: new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                }
            }),
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                return (!(magnetT && magnetT.getAttribute('type') === 'output') && !(cellViewT && cellViewT.model.get('type') === 'link'));
            },
            validateMagnet: function (cellView, magnet) {
                return magnet.getAttribute('magnet') !== 'passive';
            }
        });
    }
    DiagramPaper.prototype.getGridSizeValue = function () {
        return this.gridSizeValue;
    };
    return DiagramPaper;
})(joint.dia.Paper);
var NodeType = (function () {
    function NodeType() {
    }
    return NodeType;
})();
var Property = (function () {
    function Property(value, type) {
        this.value = value;
        this.type = type;
    }
    return Property;
})();
var TwoDModelEngineApiImpl = (function () {
    function TwoDModelEngineApiImpl() {
    }
    return TwoDModelEngineApiImpl;
})();
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
var EllipseItemImpl = (function () {
    function EllipseItemImpl(worldModel, xStart, yStart, width, color) {
        this.handleSize = 10;
        var paper = worldModel.getPaper();
        this.ellipse = paper.ellipse(xStart, yStart, 0, 0);
        this.ellipse.attr({
            fill: "transparent",
            cursor: "pointer",
            "stroke": color,
            "stroke-width": width
        });
        var ellipseItem = this;
        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };
        this.handleTopLeft = paper.rect(xStart, yStart, this.handleSize, this.handleSize).attr(handleAttrs);
        this.handleTopRight = paper.rect(xStart - this.handleSize, yStart, this.handleSize, this.handleSize).attr(handleAttrs);
        this.handleBottomLeft = paper.rect(xStart, yStart - this.handleSize, this.handleSize, this.handleSize).attr(handleAttrs);
        this.handleBottomRight = paper.rect(xStart - this.handleSize, yStart - this.handleSize, this.handleSize, this.handleSize).attr(handleAttrs);
        var startTopLeftHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.ox = this.attr("x");
                this.oy = this.attr("y");
                this.oppositeCornerX = ellipseItem.handleBottomRight.attr("x") + ellipseItem.handleSize;
                this.oppositeCornerY = ellipseItem.handleBottomRight.attr("y") + ellipseItem.handleSize;
            }
            return this;
        }, startTopRightHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.ox = this.attr("x") + ellipseItem.handleSize;
                this.oy = this.attr("y");
                this.oppositeCornerX = ellipseItem.handleBottomLeft.attr("x");
                this.oppositeCornerY = ellipseItem.handleBottomLeft.attr("y") + ellipseItem.handleSize;
            }
            return this;
        }, startBottomLeftHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.ox = this.attr("x");
                this.oy = this.attr("y") + ellipseItem.handleSize;
                this.oppositeCornerX = ellipseItem.handleTopRight.attr("x") + ellipseItem.handleSize;
                this.oppositeCornerY = ellipseItem.handleTopRight.attr("y");
            }
            return this;
        }, startBottomRightHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.ox = this.attr("x") + ellipseItem.handleSize;
                this.oy = this.attr("y") + ellipseItem.handleSize;
                this.oppositeCornerX = ellipseItem.handleTopLeft.attr("x");
                this.oppositeCornerY = ellipseItem.handleTopLeft.attr("y");
            }
            return this;
        }, moveHandle = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.ox + dx;
                var newY = this.oy + dy;
                ellipseItem.updateCorner(this.oppositeCornerX, this.oppositeCornerY, newX, newY);
            }
            return this;
        }, upHandle = function () {
            return this;
        };
        ellipseItem.handleTopLeft.drag(moveHandle, startTopLeftHandle, upHandle);
        ellipseItem.handleTopRight.drag(moveHandle, startTopRightHandle, upHandle);
        ellipseItem.handleBottomLeft.drag(moveHandle, startBottomLeftHandle, upHandle);
        ellipseItem.handleBottomRight.drag(moveHandle, startBottomRightHandle, upHandle);
        var startEllipse = function () {
            if (!worldModel.getDrawMode()) {
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
                this.handleTopLeftCoord = {
                    x: ellipseItem.handleTopLeft.attr("x"),
                    y: ellipseItem.handleTopLeft.attr("y")
                };
                this.handleTopRightCoord = {
                    x: ellipseItem.handleTopRight.attr("x"),
                    y: ellipseItem.handleTopRight.attr("y")
                };
                this.handleBottomLeftCoord = {
                    x: ellipseItem.handleBottomLeft.attr("x"),
                    y: ellipseItem.handleBottomLeft.attr("y")
                };
                this.handleBottomRightCoord = {
                    x: ellipseItem.handleBottomRight.attr("x"),
                    y: ellipseItem.handleBottomRight.attr("y")
                };
                worldModel.setCurrentElement(ellipseItem);
            }
            return this;
        }, moveEllipse = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                ellipseItem.ellipse.attr({ cx: newX, cy: newY });
                ellipseItem.handleTopLeft.attr({ x: this.handleTopLeftCoord.x + dx, y: this.handleTopLeftCoord.y + dy });
                ellipseItem.handleTopRight.attr({ x: this.handleTopRightCoord.x + dx, y: this.handleTopRightCoord.y + dy });
                ellipseItem.handleBottomLeft.attr({ x: this.handleBottomLeftCoord.x + dx, y: this.handleBottomLeftCoord.y + dy });
                ellipseItem.handleBottomRight.attr({ x: this.handleBottomRightCoord.x + dx, y: this.handleBottomRightCoord.y + dy });
            }
            return this;
        }, upEllipse = function () {
            return this;
        };
        ellipseItem.ellipse.drag(moveEllipse, startEllipse, upEllipse);
    }
    EllipseItemImpl.prototype.updateCorner = function (oppositeCornerX, oppositeCornerY, x, y) {
        var newCx = (oppositeCornerX + x) / 2;
        var newCy = (oppositeCornerY + y) / 2;
        var newRx = Math.abs(x - oppositeCornerX) / 2;
        var newRy = Math.abs(y - oppositeCornerY) / 2;
        this.ellipse.attr({ "cx": newCx, "cy": newCy });
        this.ellipse.attr({ "rx": newRx, "ry": newRy });
        if (x - oppositeCornerX >= 0 && y - oppositeCornerY >= 0) {
            this.handleTopLeft.attr({ x: oppositeCornerX, y: oppositeCornerY });
            this.handleTopRight.attr({ x: x - this.handleSize, y: oppositeCornerY });
            this.handleBottomLeft.attr({ x: oppositeCornerX, y: y - this.handleSize });
            this.handleBottomRight.attr({ x: x - this.handleSize, y: y - this.handleSize });
        }
        else if (x - oppositeCornerX < 0 && y - oppositeCornerY >= 0) {
            this.handleTopLeft.attr({ x: x, y: oppositeCornerY });
            this.handleTopRight.attr({ x: oppositeCornerX - this.handleSize, y: oppositeCornerY });
            this.handleBottomLeft.attr({ x: x, y: y - this.handleSize });
            this.handleBottomRight.attr({ x: oppositeCornerX - this.handleSize, y: y - this.handleSize });
        }
        else if (x - oppositeCornerX >= 0 && y - oppositeCornerY < 0) {
            this.handleTopLeft.attr({ x: oppositeCornerX, y: y });
            this.handleTopRight.attr({ x: x - this.handleSize, y: y });
            this.handleBottomLeft.attr({ x: oppositeCornerX, y: oppositeCornerY - this.handleSize });
            this.handleBottomRight.attr({ x: x - this.handleSize, y: oppositeCornerY - this.handleSize });
        }
        else if (x - oppositeCornerX < 0 && y - oppositeCornerY < 0) {
            this.handleTopLeft.attr({ x: x, y: y });
            this.handleTopRight.attr({ x: oppositeCornerX - this.handleSize, y: y });
            this.handleBottomLeft.attr({ x: x, y: oppositeCornerY - this.handleSize });
            this.handleBottomRight.attr({ x: oppositeCornerX - this.handleSize, y: oppositeCornerY - this.handleSize });
        }
    };
    EllipseItemImpl.prototype.hideHandles = function () {
        this.handleTopLeft.hide();
        this.handleTopRight.hide();
        this.handleBottomLeft.hide();
        this.handleBottomRight.hide();
    };
    EllipseItemImpl.prototype.showHandles = function () {
        this.handleTopLeft.show();
        this.handleTopRight.show();
        this.handleBottomLeft.show();
        this.handleBottomRight.show();
    };
    EllipseItemImpl.prototype.remove = function () {
        this.handleTopLeft.remove();
        this.handleTopRight.remove();
        this.handleBottomLeft.remove();
        this.handleBottomRight.remove();
        this.ellipse.remove();
    };
    return EllipseItemImpl;
})();
var LineItemImpl = (function () {
    function LineItemImpl(worldModel, xStart, yStart, xEnd, yEnd, width, color) {
        var paper = worldModel.getPaper();
        this.path = paper.path("M" + xStart + " " + yStart + " L" + xEnd + " " + yEnd);
        this.path.attr({
            cursor: "pointer",
            "stroke": color,
            "stroke-width": width
        });
        this.pathArray = this.path.attr("path");
        var handleRadius = 10;
        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };
        this.handleStart = paper.circle(xStart, yStart, handleRadius).attr(handleAttrs);
        this.handleEnd = paper.circle(xEnd, yEnd, handleRadius).attr(handleAttrs);
        var line = this;
        var startHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
            }
            return this;
        }, moveHandleStart = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                line.updateStart(newX, newY);
            }
            return this;
        }, moveHandleEnd = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                line.updateEnd(newX, newY);
            }
            return this;
        }, upHandle = function () {
            return this;
        };
        line.handleStart.drag(moveHandleStart, startHandle, upHandle);
        line.handleEnd.drag(moveHandleEnd, startHandle, upHandle);
        var startPath = function () {
            if (!worldModel.getDrawMode()) {
                this.startX = line.pathArray[0][1];
                this.startY = line.pathArray[0][2];
                this.endX = line.pathArray[1][1];
                this.endY = line.pathArray[1][2];
                this.ox = this.attr("x");
                this.oy = this.attr("y");
                worldModel.setCurrentElement(line);
            }
            return this;
        }, movePath = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var trans_x = dx - this.ox;
                var trans_y = dy - this.oy;
                line.pathArray[0][1] = this.startX + dx;
                line.pathArray[0][2] = this.startY + dy;
                line.pathArray[1][1] = this.endX + dx;
                line.pathArray[1][2] = this.endY + dy;
                line.path.attr({ path: line.pathArray });
                this.ox = dx;
                this.oy = dy;
                var hStartX = line.handleStart.attr("cx") + trans_x;
                var hStartY = line.handleStart.attr("cy") + trans_y;
                var hEndX = line.handleEnd.attr("cx") + trans_x;
                var hEndY = line.handleEnd.attr("cy") + trans_y;
                line.handleStart.attr({ cx: hStartX, cy: hStartY });
                line.handleEnd.attr({ cx: hEndX, cy: hEndY });
            }
            return this;
        }, upPath = function () {
            return this;
        };
        line.path.drag(movePath, startPath, upPath);
    }
    LineItemImpl.prototype.getPath = function () {
        return this.path;
    };
    LineItemImpl.prototype.updateStart = function (x, y) {
        this.pathArray[0][1] = x;
        this.pathArray[0][2] = y;
        this.path.attr({ path: this.pathArray });
        this.handleStart.attr({ cx: x, cy: y });
    };
    LineItemImpl.prototype.updateEnd = function (x, y) {
        this.pathArray[1][1] = x;
        this.pathArray[1][2] = y;
        this.path.attr({ path: this.pathArray });
        this.handleEnd.attr({ cx: x, cy: y });
    };
    LineItemImpl.prototype.hideHandles = function () {
        this.handleStart.hide();
        this.handleEnd.hide();
    };
    LineItemImpl.prototype.showHandles = function () {
        this.handleStart.show();
        this.handleEnd.show();
    };
    LineItemImpl.prototype.remove = function () {
        this.handleStart.remove();
        this.handleEnd.remove();
        this.path.remove();
    };
    return LineItemImpl;
})();
var PencilItemImpl = (function () {
    function PencilItemImpl(worldModel, xStart, yStart, width, color) {
        this.pathArray = new Array();
        var paper = worldModel.getPaper();
        this.pathArray[0] = ["M", xStart, yStart];
        this.path = paper.path(this.pathArray);
        this.path.attr({
            cursor: "pointer",
            "stroke": color,
            "stroke-width": width
        });
        var pencilItem = this;
        var startPath = function () {
            if (!worldModel.getDrawMode()) {
                this.transformation = this.transform();
                worldModel.setCurrentElement(pencilItem);
            }
            return this;
        }, movePath = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                this.transform(this.transformation + "T" + dx + "," + dy);
            }
            return this;
        }, upPath = function () {
            return this;
        };
        pencilItem.path.drag(movePath, startPath, upPath);
    }
    PencilItemImpl.prototype.updatePath = function (x, y) {
        this.pathArray[this.pathArray.length] = ["L", x, y];
        this.path.attr({ path: this.pathArray });
    };
    PencilItemImpl.prototype.getPath = function () {
        return this.path;
    };
    PencilItemImpl.prototype.hideHandles = function () {
    };
    PencilItemImpl.prototype.showHandles = function () {
    };
    PencilItemImpl.prototype.remove = function () {
        this.path.remove();
    };
    return PencilItemImpl;
})();
var RobotItemImpl = (function () {
    function RobotItemImpl(worldModel, position, imageFileName, robot) {
        this.startCenter = new TwoDPosition();
        this.center = new TwoDPosition();
        this.width = 50;
        this.height = 50;
        this.sensors = {};
        this.worldModel = worldModel;
        this.robot = robot;
        this.startPosition = position;
        var paper = worldModel.getPaper();
        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);
        this.center.x = position.x + this.width / 2;
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x;
        this.startCenter.y = this.center.y;
        var handleRadius = 10;
        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };
        this.rotateHandle = paper.circle(position.x + this.width + 20, position.y + this.height / 2, handleRadius).attr(handleAttrs);
        var robotItem = this;
        var startHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.transformation = robotItem.image.transform();
                robotItem.updateSensorsTransformations();
                this.rotation = robotItem.image.matrix.split().rotate;
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
            }
            return this;
        }, moveHandle = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                var offsetX = newX - robotItem.center.x;
                var offsetY = newY - robotItem.center.y;
                var tan = offsetY / offsetX;
                var angle = Math.atan(tan) / (Math.PI / 180);
                if (offsetX < 0) {
                    angle += 180;
                }
                angle -= this.rotation;
                robotItem.image.transform(this.transformation + "R" + angle + "," + robotItem.center.x + "," + robotItem.center.y);
                robotItem.transformSensorsItems("R" + angle + "," + robotItem.center.x + "," + robotItem.center.y);
                var newCx = robotItem.image.matrix.x(robotItem.startCenter.x + robotItem.width / 2 + 20, robotItem.startCenter.y);
                var newCy = robotItem.image.matrix.y(robotItem.startCenter.x + robotItem.width / 2 + 20, robotItem.startCenter.y);
                this.attr({ cx: newCx, cy: newCy });
            }
            return this;
        }, upHandle = function () {
            if (!worldModel.getDrawMode()) {
                robotItem.updateSensorsTransformations();
            }
            return this;
        };
        robotItem.rotateHandle.drag(moveHandle, startHandle, upHandle);
        var start = function () {
            if (!worldModel.getDrawMode()) {
                this.transformation = this.transform();
                robotItem.updateSensorsTransformations();
                this.handle_cx = robotItem.rotateHandle.attr("cx");
                this.handle_cy = robotItem.rotateHandle.attr("cy");
                worldModel.setCurrentElement(robotItem);
            }
            return this;
        }, move = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                this.transform(this.transformation + "T" + dx + "," + dy);
                robotItem.transformSensorsItems("T" + dx + "," + dy);
                robotItem.rotateHandle.attr({ "cx": this.handle_cx + dx, "cy": this.handle_cy + dy });
            }
            return this;
        }, up = function () {
            if (!worldModel.getDrawMode()) {
                robotItem.center.x = this.matrix.x(robotItem.startCenter.x, robotItem.startCenter.y);
                robotItem.center.y = this.matrix.y(robotItem.startCenter.x, robotItem.startCenter.y);
                robotItem.updateSensorsTransformations();
            }
            return this;
        };
        this.image.drag(move, start, up);
        this.hideHandles();
    }
    RobotItemImpl.prototype.setStartPosition = function (position, direction) {
        this.startPosition = position;
        this.image.attr({ x: position.x, y: position.y });
        this.center.x = position.x + this.width / 2;
        this.center.y = position.y + this.height / 2;
        this.startCenter.x = this.center.x;
        this.startCenter.y = this.center.y;
        this.image.transform("R" + direction + "," + this.center.x + "," + this.center.y);
        this.rotateHandle.attr({ "cx": +position.x + this.width + 20, "cy": position.y + this.height / 2 });
    };
    RobotItemImpl.prototype.ride = function () {
        console.log("robot ride");
    };
    RobotItemImpl.prototype.hideHandles = function () {
        this.rotateHandle.hide();
    };
    RobotItemImpl.prototype.showHandles = function () {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    };
    RobotItemImpl.prototype.getWidth = function () {
        return this.width;
    };
    RobotItemImpl.prototype.getHeight = function () {
        return this.height;
    };
    RobotItemImpl.prototype.getStartPosition = function () {
        return this.startPosition;
    };
    RobotItemImpl.prototype.removeSensorItem = function (portName) {
        var sensor = this.sensors[portName];
        if (sensor) {
            sensor.remove();
            delete this.sensors[portName];
        }
    };
    RobotItemImpl.prototype.addSensorItem = function (portName, sensorType, pathToImage) {
        var sensor;
        if (sensorType.isA(RangeSensor)) {
            sensor = new SonarSensorItem(this, this.worldModel, sensorType, pathToImage);
        }
        else {
            sensor = new SensorItem(this, this.worldModel, sensorType, pathToImage);
        }
        sensor.transform(this.image.transform());
        sensor.updateTransformationString();
        this.sensors[portName] = sensor;
    };
    RobotItemImpl.prototype.updateSensorsTransformations = function () {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.updateTransformationString();
        }
    };
    RobotItemImpl.prototype.transformSensorsItems = function (transformationString) {
        for (var portName in this.sensors) {
            var sensor = this.sensors[portName];
            sensor.transform(transformationString);
        }
    };
    return RobotItemImpl;
})();
var SensorItem = (function () {
    function SensorItem(robotItem, worldModel, sensorType, pathToImage) {
        this.transformationString = "";
        this.robotItem = robotItem;
        var paper = worldModel.getPaper();
        this.sensorType = sensorType;
        this.degineImageSizes(sensorType);
        var defaultPosition = this.getDefaultPosition();
        this.image = paper.image((pathToImage) ? pathToImage : this.pathToImage(), defaultPosition.x, defaultPosition.y, this.width, this.height);
        this.centerX = defaultPosition.x + this.width / 2;
        this.centerY = defaultPosition.y + this.height / 2;
        this.startCx = this.centerX;
        this.startCy = this.centerY;
        var handleRadius = 10;
        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };
        var sensorItem = this;
        this.rotateHandle = paper.circle(defaultPosition.x + this.width + 20, defaultPosition.y + this.height / 2, handleRadius).attr(handleAttrs);
        var startHandle = function () {
            if (!worldModel.getDrawMode()) {
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
                this.rotation = sensorItem.image.matrix.split().rotate;
            }
            return this;
        }, moveHandle = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                var offsetX = newX - sensorItem.centerX;
                var offsetY = newY - sensorItem.centerY;
                var tan = offsetY / offsetX;
                var angle = Math.atan(tan) / (Math.PI / 180);
                if (offsetX < 0) {
                    angle += 180;
                }
                angle -= this.rotation;
                sensorItem.rotate(angle);
                var newCx = sensorItem.image.matrix.x(sensorItem.startCx + sensorItem.width / 2 + 20, sensorItem.startCy);
                var newCy = sensorItem.image.matrix.y(sensorItem.startCx + sensorItem.width / 2 + 20, sensorItem.startCy);
                this.attr({ cx: newCx, cy: newCy });
            }
            return this;
        }, upHandle = function () {
            sensorItem.updateTransformationString();
            return this;
        };
        sensorItem.rotateHandle.drag(moveHandle, startHandle, upHandle);
        var start = function () {
            if (!worldModel.getDrawMode()) {
                this.handle_cx = sensorItem.rotateHandle.attr("cx");
                this.handle_cy = sensorItem.rotateHandle.attr("cy");
                worldModel.setCurrentElement(sensorItem);
            }
            return this;
        }, move = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                sensorItem.transform("T" + dx + "," + dy);
                sensorItem.rotateHandle.attr({ "cx": this.handle_cx + dx, "cy": this.handle_cy + dy });
            }
            return this;
        }, up = function () {
            if (!worldModel.getDrawMode()) {
                sensorItem.centerX = this.matrix.x(sensorItem.startCx, sensorItem.startCy);
                sensorItem.centerY = this.matrix.y(sensorItem.startCx, sensorItem.startCy);
            }
            sensorItem.updateTransformationString();
            return this;
        };
        this.image.drag(move, start, up);
        this.hideHandles();
    }
    SensorItem.prototype.getDefaultPosition = function () {
        var startX = this.robotItem.getStartPosition().x + this.robotItem.getWidth() + 15;
        var startY = this.robotItem.getStartPosition().y + this.robotItem.getHeight() / 2 - this.height / 2;
        return new TwoDPosition(startX, startY);
    };
    SensorItem.prototype.name = function () {
        if (this.sensorType.isA(TouchSensor)) {
            return "touch";
        }
        else if (this.sensorType.isA(ColorSensorFull) || this.sensorType.isA(ColorSensorPassive)) {
            return "color_empty";
        }
        else if (this.sensorType.isA(ColorSensorRed)) {
            return "color_red";
        }
        else if (this.sensorType.isA(ColorSensorGreen)) {
            return "color_green";
        }
        else if (this.sensorType.isA(ColorSensorBlue)) {
            return "color_blue";
        }
        else if (this.sensorType.isA(RangeSensor)) {
            return "sonar";
        }
        else if (this.sensorType.isA(LightSensor)) {
            return "light";
        }
        else {
            alert(!"Unknown sensor type");
            return "";
        }
    };
    SensorItem.prototype.pathToImage = function () {
        return "images/2dmodel/sensors/2d_" + this.name() + ".png";
    };
    SensorItem.prototype.degineImageSizes = function (sensorType) {
        if (sensorType.isA(TouchSensor)) {
            this.width = 25;
            this.height = 25;
        }
        else if (sensorType.isA(ColorSensor) || sensorType.isA(LightSensor)) {
            this.width = 15;
            this.height = 15;
        }
        else if (sensorType.isA(RangeSensor)) {
            this.width = 35;
            this.height = 35;
        }
        else {
            alert("Unknown sensor type");
        }
    };
    SensorItem.prototype.transform = function (transformationString) {
        this.image.transform(this.transformationString + transformationString);
        var newCx = this.image.matrix.x(this.startCx + this.width / 2 + 20, this.startCy);
        var newCy = this.image.matrix.y(this.startCx + this.width / 2 + 20, this.startCy);
        this.rotateHandle.attr({ cx: newCx, cy: newCy });
    };
    SensorItem.prototype.updateTransformationString = function () {
        this.transformationString = this.image.transform();
    };
    SensorItem.prototype.rotate = function (angle) {
        this.image.transform(this.transformationString + "R" + angle);
    };
    SensorItem.prototype.hideHandles = function () {
        this.rotateHandle.hide();
    };
    SensorItem.prototype.showHandles = function () {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    };
    SensorItem.prototype.remove = function () {
        this.image.remove();
        this.rotateHandle.remove();
    };
    return SensorItem;
})();
var SonarSensorItem = (function (_super) {
    __extends(SonarSensorItem, _super);
    function SonarSensorItem(robotItem, worldModel, sensorType, pathToImage) {
        _super.call(this, robotItem, worldModel, sensorType, pathToImage);
        this.sonarRange = 255;
        this.regionTransformationString = "";
        var paper = worldModel.getPaper();
        var defaultPosition = this.getDefaultPosition();
        this.regionStartX = defaultPosition.x + this.width / 2;
        this.regionStartY = defaultPosition.y + this.height / 2;
        var regAngle = 20;
        var halfRegAngleInRad = regAngle / 2 * (Math.PI / 180);
        var rangeInPixels = this.sonarRange * Constants.pixelsInCm;
        var regionTopX = this.regionStartX + Math.cos(halfRegAngleInRad) * rangeInPixels;
        var regionTopY = this.regionStartY - Math.sin(halfRegAngleInRad) * rangeInPixels;
        var regionBottomX = regionTopX;
        var regionBottomY = this.regionStartY + Math.sin(halfRegAngleInRad) * rangeInPixels;
        this.scanningRegion = paper.path("M" + this.regionStartX + "," + this.regionStartY + "L" + regionTopX + "," + regionTopY + "Q" + (this.regionStartX + rangeInPixels) + "," + this.regionStartY + " " + regionBottomX + "," + regionBottomY + "Z");
        this.scanningRegion.attr({ fill: "#c5d0de", stroke: "#b1bbc7", opacity: 0.5 });
    }
    SonarSensorItem.prototype.transform = function (transformationString) {
        _super.prototype.transform.call(this, transformationString);
        this.scanningRegion.transform(this.regionTransformationString + transformationString);
    };
    SonarSensorItem.prototype.updateTransformationString = function () {
        _super.prototype.updateTransformationString.call(this);
        this.regionTransformationString = this.scanningRegion.transform();
    };
    SonarSensorItem.prototype.rotate = function (angle) {
        _super.prototype.rotate.call(this, angle);
        var regionRotationX = this.image.matrix.x(this.regionStartX, this.regionStartY);
        var regionRotationY = this.image.matrix.y(this.regionStartX, this.regionStartY);
        this.scanningRegion.transform(this.regionTransformationString + "R" + angle + "," + regionRotationX + "," + regionRotationY);
    };
    SonarSensorItem.prototype.remove = function () {
        _super.prototype.remove.call(this);
        this.scanningRegion.remove();
    };
    return SonarSensorItem;
})(SensorItem);
var WallItemImpl = (function () {
    function WallItemImpl(worldModel, xStart, yStart, xEnd, yEnd) {
        var paper = worldModel.getPaper();
        var wall = this;
        this.width = 15;
        this.path = paper.path("M" + xStart + " " + yStart + " L" + xEnd + " " + yEnd);
        this.path.attr({
            cursor: "pointer",
            "stroke-width": wall.width
        });
        $(this.path.node).attr("class", "path");
        $(".path").attr("stroke", "url(#wall_pattern)");
        this.pathArray = this.path.attr("path");
        var handleRadius = 10;
        this.handleStart = paper.circle(xStart, yStart, handleRadius).attr({
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        });
        $(this.handleStart.node).attr("class", "handleStart");
        $(".handleStart").attr("fill", "url(#wall_pattern)");
        this.handleEnd = paper.circle(xEnd, yEnd, handleRadius).attr({
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        });
        $(this.handleEnd.node).attr("class", "handleEnd");
        $(".handleEnd").attr("fill", "url(#wall_pattern)");
        var start = function () {
            if (!worldModel.getDrawMode()) {
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
            }
            return this;
        }, moveStart = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                wall.updateStart(newX, newY);
            }
            return this;
        }, moveEnd = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                wall.updateEnd(newX, newY);
            }
            return this;
        }, up = function () {
            return this;
        };
        wall.handleStart.drag(moveStart, start, up);
        wall.handleEnd.drag(moveEnd, start, up);
        var startPath = function () {
            if (!worldModel.getDrawMode()) {
                this.startX = wall.pathArray[0][1];
                this.startY = wall.pathArray[0][2];
                this.endX = wall.pathArray[1][1];
                this.endY = wall.pathArray[1][2];
                this.ox = this.attr("x");
                this.oy = this.attr("y");
                worldModel.setCurrentElement(wall);
            }
            return this;
        }, movePath = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var trans_x = dx - this.ox;
                var trans_y = dy - this.oy;
                wall.pathArray[0][1] = this.startX + dx;
                wall.pathArray[0][2] = this.startY + dy;
                wall.pathArray[1][1] = this.endX + dx;
                wall.pathArray[1][2] = this.endY + dy;
                wall.path.attr({ path: wall.pathArray });
                this.ox = dx;
                this.oy = dy;
                var hStartX = wall.handleStart.attr("cx") + trans_x;
                var hStartY = wall.handleStart.attr("cy") + trans_y;
                var hEndX = wall.handleEnd.attr("cx") + trans_x;
                var hEndY = wall.handleEnd.attr("cy") + trans_y;
                wall.handleStart.attr({ cx: hStartX, cy: hStartY });
                wall.handleEnd.attr({ cx: hEndX, cy: hEndY });
            }
            return this;
        }, upPath = function () {
            return this;
        };
        wall.path.drag(movePath, startPath, upPath);
    }
    WallItemImpl.prototype.getPath = function () {
        return this.path;
    };
    WallItemImpl.prototype.updateStart = function (x, y) {
        this.pathArray[0][1] = x;
        this.pathArray[0][2] = y;
        this.path.attr({ path: this.pathArray });
        this.handleStart.attr({ cx: x, cy: y });
    };
    WallItemImpl.prototype.updateEnd = function (x, y) {
        this.pathArray[1][1] = x;
        this.pathArray[1][2] = y;
        this.path.attr({ path: this.pathArray });
        this.handleEnd.attr({ cx: x, cy: y });
    };
    WallItemImpl.prototype.hideHandles = function () {
        this.handleStart.hide();
        this.handleEnd.hide();
    };
    WallItemImpl.prototype.showHandles = function () {
        this.handleStart.show();
        this.handleEnd.show();
    };
    WallItemImpl.prototype.remove = function () {
        this.handleStart.remove();
        this.handleEnd.remove();
        this.path.remove();
    };
    return WallItemImpl;
})();
var Constants = (function () {
    function Constants() {
    }
    Constants.robotWheelDiameterInPx = 16;
    Constants.robotWheelDiameterInCm = 5.6;
    Constants.pixelsInCm = Constants.robotWheelDiameterInPx / Constants.robotWheelDiameterInCm;
    return Constants;
})();
var ModelImpl = (function () {
    function ModelImpl() {
        this.robotModels = [];
        var model = this;
        this.timeline = new TimelineImpl();
        model.worldModel = new WorldModelImpl();
    }
    ModelImpl.prototype.getWorldModel = function () {
        return this.worldModel;
    };
    ModelImpl.prototype.getTimeline = function () {
        return this.timeline;
    };
    ModelImpl.prototype.getRobotModels = function () {
        return this.robotModels;
    };
    ModelImpl.prototype.getSetting = function () {
        return this.settings;
    };
    ModelImpl.prototype.addRobotModel = function (robotModel) {
        var model = this;
        $(document).ready(function () {
            var robot = new RobotModelImpl(model.worldModel, robotModel, new TwoDPosition(300, 300));
            model.robotModels.push(robot);
            model.timeline.addRobotModel(robot);
        });
    };
    return ModelImpl;
})();
var RobotModelImpl = (function () {
    function RobotModelImpl(worldModel, twoDRobotModel, position) {
        this.twoDRobotModel = twoDRobotModel;
        this.robotItem = new RobotItemImpl(worldModel, position, twoDRobotModel.getRobotImage(), this);
        this.sensorsConfiguration = new SensorsConfiguration(this);
    }
    RobotModelImpl.prototype.info = function () {
        return this.twoDRobotModel;
    };
    RobotModelImpl.prototype.removeSensorItem = function (portName) {
        this.robotItem.removeSensorItem(portName);
    };
    RobotModelImpl.prototype.getSensorsConfiguration = function () {
        return this.sensorsConfiguration;
    };
    RobotModelImpl.prototype.addSensorItem = function (portName, deviceType) {
        this.robotItem.addSensorItem(portName, deviceType, this.twoDRobotModel.sensorImagePath(deviceType));
    };
    RobotModelImpl.prototype.nextFragment = function () {
        this.robotItem.ride();
    };
    return RobotModelImpl;
})();
var SensorsConfiguration = (function (_super) {
    __extends(SensorsConfiguration, _super);
    function SensorsConfiguration(robotModel) {
        _super.call(this);
        this.robotModel = robotModel;
        this.robotModelName = robotModel.info().getName();
    }
    SensorsConfiguration.prototype.isSensorHaveView = function (sensorType) {
        return sensorType.isA(TouchSensor) || sensorType.isA(ColorSensor) || sensorType.isA(LightSensor) || sensorType.isA(RangeSensor) || sensorType.isA(VectorSensor);
    };
    SensorsConfiguration.prototype.addSensor = function (portName, sensorType) {
        if (this.getCurrentConfiguration(this.robotModelName, portName)) {
            this.removeSensor(portName);
        }
        this.deviceConfigurationChanged(this.robotModel.info().getName(), portName, sensorType);
        if (this.isSensorHaveView(sensorType)) {
            this.robotModel.addSensorItem(portName, sensorType);
        }
    };
    SensorsConfiguration.prototype.removeSensor = function (portName) {
        var sensor = this.getCurrentConfiguration(this.robotModelName, portName);
        if (sensor) {
            if (this.isSensorHaveView(sensor)) {
                this.robotModel.removeSensorItem(portName);
            }
            this.deviceConfigurationChanged(this.robotModelName, portName, null);
        }
    };
    return SensorsConfiguration;
})(DevicesConfigurationProvider);
var TimelineImpl = (function () {
    function TimelineImpl() {
        this.timeInterval = 10;
        this.fps = 28;
        this.defaultFrameLength = 1000 / this.fps;
        this.slowSpeedFactor = 2;
        this.normalSpeedFactor = 5;
        this.fastSpeedFactor = 10;
        this.immediateSpeedFactor = 100000000;
        this.defaultRealTimeInterval = 0;
        this.ticksPerCycle = 3;
        this.frameLength = this.defaultFrameLength;
        this.robotModels = [];
    }
    TimelineImpl.prototype.start = function () {
        var timeline = this;
        this.intervalId = setInterval(function () {
            timeline.onTimer(timeline);
        }, this.defaultFrameLength);
    };
    TimelineImpl.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    TimelineImpl.prototype.onTimer = function (timeline) {
        timeline.getRobotModels().forEach(function (model) {
            model.nextFragment();
        });
    };
    TimelineImpl.prototype.setSpeedFactor = function (factor) {
        this.speedFactor = factor;
    };
    TimelineImpl.prototype.getSpeedFactor = function () {
        return this.speedFactor;
    };
    TimelineImpl.prototype.getRobotModels = function () {
        return this.robotModels;
    };
    TimelineImpl.prototype.addRobotModel = function (robotModel) {
        this.robotModels.push(robotModel);
    };
    return TimelineImpl;
})();
var WorldModelImpl = (function () {
    function WorldModelImpl() {
        this.drawMode = 0;
        this.currentElement = null;
        this.colorFields = [];
        this.wallItems = [];
        this.paper = Raphael("twoDModel_stage", "100%", "100%");
        $(this.paper.canvas).attr("id", "twoDModel_paper");
        var wall_pattern = '<pattern id="wall_pattern" patternUnits="userSpaceOnUse" width="85" height="80">\
                                        <image xlink:href="images/2dmodel/2d_wall.png" width="85" height="80" />\
                                    </pattern>';
        $("body").append('<svg id="dummy" style="display:none"><defs>' + wall_pattern + '</defs></svg>');
        $("#twoDModel_paper defs").append($("#dummy pattern"));
        $("#dummy").remove();
        var worldModel = this;
        $(document).ready(function () {
            var shape;
            var isDrawing = false;
            var startDrawPoint;
            $("#twoDModel_stage").mousedown(function (e) {
                switch (worldModel.drawMode) {
                    case 0:
                        if (e.target.nodeName === "svg") {
                            if (worldModel.currentElement) {
                                worldModel.currentElement.hideHandles();
                                worldModel.currentElement = null;
                            }
                        }
                        break;
                    case 1:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new LineItemImpl(worldModel, x, y, x, y, width, color);
                        worldModel.colorFields.push(shape);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break;
                    case 2:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        shape = new WallItemImpl(worldModel, x, y, x, y);
                        worldModel.wallItems.push(shape);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break;
                    case 3:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new PencilItemImpl(worldModel, x, y, width, color);
                        worldModel.colorFields.push(shape);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break;
                    case 4:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        startDrawPoint = {
                            "x": x,
                            "y": y
                        };
                        shape = new EllipseItemImpl(worldModel, x, y, width, color);
                        worldModel.colorFields.push(shape);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break;
                    default:
                }
            });
            $("#twoDModel_stage").mousemove(function (e) {
                if (isDrawing) {
                    switch (worldModel.drawMode) {
                        case 1:
                        case 2:
                            var position = worldModel.getMousePosition(e);
                            var x = position.x;
                            var y = position.y;
                            shape.updateEnd(x, y);
                            break;
                        case 3:
                            var position = worldModel.getMousePosition(e);
                            var x = position.x;
                            var y = position.y;
                            shape.updatePath(x, y);
                            break;
                        case 4:
                            var position = worldModel.getMousePosition(e);
                            var x = position.x;
                            var y = position.y;
                            shape.updateCorner(startDrawPoint.x, startDrawPoint.y, x, y);
                            break;
                        default:
                    }
                }
            });
            $("#twoDModel_stage").mouseup(function (e) {
                if (isDrawing) {
                    isDrawing = false;
                }
            });
        });
    }
    WorldModelImpl.prototype.getMousePosition = function (e) {
        var offset = $("#twoDModel_stage").offset();
        var position = {
            x: e.pageX - offset.left,
            y: e.pageY - offset.top
        };
        return position;
    };
    WorldModelImpl.prototype.setDrawLineMode = function () {
        this.drawMode = 1;
    };
    WorldModelImpl.prototype.setDrawWallMode = function () {
        this.drawMode = 2;
    };
    WorldModelImpl.prototype.setDrawPencilMode = function () {
        this.drawMode = 3;
    };
    WorldModelImpl.prototype.setDrawEllipseMode = function () {
        this.drawMode = 4;
    };
    WorldModelImpl.prototype.getDrawMode = function () {
        return this.drawMode;
    };
    WorldModelImpl.prototype.setNoneMode = function () {
        this.drawMode = 0;
    };
    WorldModelImpl.prototype.getPaper = function () {
        return this.paper;
    };
    WorldModelImpl.prototype.setCurrentElement = function (element) {
        if (this.currentElement) {
            this.currentElement.hideHandles();
        }
        this.currentElement = element;
        element.showHandles();
    };
    WorldModelImpl.prototype.clearPaper = function () {
        while (this.wallItems.length) {
            var wallItem = this.wallItems.pop();
            wallItem.remove();
        }
        while (this.colorFields.length) {
            var item = this.colorFields.pop();
            item.remove();
        }
    };
    return WorldModelImpl;
})();
var DeviceInfoImpl = (function () {
    function DeviceInfoImpl(deviceType) {
        this.deviceType = deviceType;
        this.name = deviceType.name;
        this.friendlyName = deviceType.friendlyName;
    }
    DeviceInfoImpl.fromString = function (str) {
        if (!DeviceInfoImpl.createdInfos[str]) {
            throw new Error("DeviceInfo for " + str + " not found");
        }
        else {
            return DeviceInfoImpl.createdInfos[str];
        }
    };
    DeviceInfoImpl.getInstance = function (deviceType) {
        if (!DeviceInfoImpl.createdInfos[deviceType.name]) {
            var deviceInfo = new DeviceInfoImpl(deviceType);
            DeviceInfoImpl.createdInfos[deviceType.name] = deviceInfo;
            return deviceInfo;
        }
        else {
            return DeviceInfoImpl.createdInfos[deviceType.name];
        }
    };
    DeviceInfoImpl.prototype.getName = function () {
        return this.name;
    };
    DeviceInfoImpl.prototype.getFriendlyName = function () {
        return this.friendlyName;
    };
    DeviceInfoImpl.prototype.getType = function () {
        return this.deviceType;
    };
    DeviceInfoImpl.prototype.isA = function (type) {
        var currentParent = this.deviceType;
        while (currentParent && currentParent !== type) {
            currentParent = currentParent.parentType;
        }
        return currentParent != undefined;
    };
    DeviceInfoImpl.createdInfos = {};
    return DeviceInfoImpl;
})();
var PortInfoImpl = (function () {
    function PortInfoImpl(name, direction, nameAliases, reservedVariable, reservedVariableType) {
        this.nameAliases = [];
        this.reservedVariableType = 0 /* scalar */;
        this.name = name;
        this.direction = direction;
        this.nameAliases = nameAliases;
        this.reservedVariable = reservedVariable;
        this.reservedVariableType = reservedVariableType;
    }
    PortInfoImpl.prototype.getName = function () {
        return this.name;
    };
    PortInfoImpl.prototype.getDirection = function () {
        return this.direction;
    };
    PortInfoImpl.prototype.getNameAliases = function () {
        return this.nameAliases;
    };
    PortInfoImpl.prototype.getReservedVariable = function () {
        return this.reservedVariable;
    };
    PortInfoImpl.prototype.getReservedVariableType = function () {
        return this.reservedVariableType;
    };
    return PortInfoImpl;
})();
var TrikRobotModelBase = (function (_super) {
    __extends(TrikRobotModelBase, _super);
    function TrikRobotModelBase() {
        _super.call(this);
        var analogPortConnections = [this.lightSensorInfo(), this.infraredSensorInfo()];
        this.addAllowedConnection(new PortInfoImpl("DisplayPort", 1 /* output */), [this.displayInfo()]);
        this.addAllowedConnection(new PortInfoImpl("SpeakerPort", 1 /* output */), [this.speakerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Left", 0 /* input */, [], "buttonLeft"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Right", 0 /* input */, [], "buttonRight"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Up", 0 /* input */, [], "buttonUp"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Down", 0 /* input */, [], "buttonDown"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Enter", 0 /* input */, [], "buttonEnter"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Esc", 0 /* input */, [], "buttonEsc"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("C1", 1 /* output */, ["JC1"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("C2", 1 /* output */, ["JC2"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("C3", 1 /* output */, ["JC3"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E1", 1 /* output */, ["JE1"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E2", 1 /* output */, ["JE2"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E3", 1 /* output */, ["JE3"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E4", 1 /* output */, ["JE4"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M1", 1 /* output */, ["JM1", "A", "1"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M2", 1 /* output */, ["JM2", "B", "2"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M3", 1 /* output */, ["JM3", "C", "3"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M4", 1 /* output */, ["JM4", "D", "4"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B1", 0 /* input */, ["JB1", "M1", "JM1", "A", "1"], "encoder1"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B2", 0 /* input */, ["JB2", "M2", "JM2", "B", "2"], "encoder2"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B3", 0 /* input */, ["JB3", "M3", "JM3", "C", "3"], "encoder3"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B4", 0 /* input */, ["JB4", "M4", "JM4", "D", "4"], "encoder4"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("A1", 0 /* input */, ["JA1"], "sensorA1"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A2", 0 /* input */, ["JA2"], "sensorA2"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A3", 0 /* input */, ["JA3"], "sensorA3"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A4", 0 /* input */, ["JA4"], "sensorA4"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A5", 0 /* input */, ["JA5"], "sensorA5"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A6", 0 /* input */, ["JA6"], "sensorA6"), analogPortConnections);
        this.digitalPorts = [
            new PortInfoImpl("D1", 0 /* input */, ["JD1"], "sensorD1"),
            new PortInfoImpl("D2", 0 /* input */, ["JD2"], "sensorD2"),
            new PortInfoImpl("F1", 0 /* input */, ["JF1"], "sensorF1")
        ];
        this.addAllowedConnection(this.digitalPorts[0], [this.sonarSensorInfo()]);
        this.addAllowedConnection(this.digitalPorts[1], [this.sonarSensorInfo()]);
        this.addAllowedConnection(this.digitalPorts[2], [this.motionSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GyroscopePortX", 0 /* input */, [], "gyroscopeX"), [this.gyroscopeInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GyroscopePortY", 0 /* input */, [], "gyroscopeY"), [this.gyroscopeInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GyroscopePortZ", 0 /* input */, [], "gyroscopeZ"), [this.gyroscopeInfo()]);
        this.addAllowedConnection(new PortInfoImpl("AccelerometerPortX", 0 /* input */, [], "accelerometerX"), [this.accelerometerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("AccelerometerPortY", 0 /* input */, [], "accelerometerY"), [this.accelerometerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("AccelerometerPortZ", 0 /* input */, [], "accelerometerZ"), [this.accelerometerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LedPort", 1 /* output */), [this.ledInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LineSensorXPort", 0 /* input */, [], "lineSensorX"), [this.lineSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LineSensorSizePort", 0 /* input */, [], "lineSensorSize"), [this.lineSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LineSensorCrossroadsPort", 0 /* input */, [], "lineSensorCross"), [this.lineSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ObjectSensorXPort", 0 /* input */, [], "objectSensorX"), [this.objectSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ObjectSensorYPort", 0 /* input */, [], "objectSensorY"), [this.objectSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ObjectSensorSizePort", 0 /* input */, [], "objectSensorSize"), [this.objectSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ColorSensorRPort", 0 /* input */, [], "colorSensorR"), [this.colorSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ColorSensorGPort", 0 /* input */, [], "colorSensorG"), [this.colorSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ColorSensorBPort", 0 /* input */, [], "colorSensorB"), [this.colorSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ShellPort", 1 /* output */), [this.shellInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad1PosPort", 0 /* input */, [], "gamepadPad1", 1 /* vector */), [this.gamepadPadInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad2PosPort", 0 /* input */, [], "gamepadPad2", 1 /* vector */), [this.gamepadPadInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad1PressedPort", 0 /* input */, [], "gamepadPad1Pressed"), [this.gamepadPadPressSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad2PressedPort", 0 /* input */, [], "gamepadPad2Pressed"), [this.gamepadPadPressSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadWheelPort", 0 /* input */, [], "gamepadWheel"), [this.gamepadWheelInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton1Port", 0 /* input */, [], "gamepadButton1"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton2Port", 0 /* input */, [], "gamepadButton2"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton3Port", 0 /* input */, [], "gamepadButton3"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton4Port", 0 /* input */, [], "gamepadButton4"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton5Port", 0 /* input */, [], "gamepadButton5"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadConnectionIndicatorPort", 0 /* input */, [], "gamepadConnected"), [this.gamepadConnectionIndicatorInfo()]);
    }
    TrikRobotModelBase.prototype.getConfigurablePorts = function () {
        return _super.prototype.getConfigurablePorts.call(this).concat(this.digitalPorts);
    };
    TrikRobotModelBase.prototype.displayInfo = function () {
        return DeviceInfoImpl.getInstance(Display);
    };
    TrikRobotModelBase.prototype.speakerInfo = function () {
        return DeviceInfoImpl.getInstance(Speaker);
    };
    TrikRobotModelBase.prototype.buttonInfo = function () {
        return DeviceInfoImpl.getInstance(Button);
    };
    TrikRobotModelBase.prototype.powerMotorInfo = function () {
        return DeviceInfoImpl.getInstance(Motor);
    };
    TrikRobotModelBase.prototype.servoMotorInfo = function () {
        return DeviceInfoImpl.getInstance(Motor);
    };
    TrikRobotModelBase.prototype.encoderInfo = function () {
        return DeviceInfoImpl.getInstance(EncoderSensor);
    };
    TrikRobotModelBase.prototype.lightSensorInfo = function () {
        return DeviceInfoImpl.getInstance(LightSensor);
    };
    TrikRobotModelBase.prototype.infraredSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikInfraredSensor);
    };
    TrikRobotModelBase.prototype.sonarSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikSonarSensor);
    };
    TrikRobotModelBase.prototype.motionSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikMotionSensor);
    };
    TrikRobotModelBase.prototype.gyroscopeInfo = function () {
        return DeviceInfoImpl.getInstance(GyroscopeSensor);
    };
    TrikRobotModelBase.prototype.accelerometerInfo = function () {
        return DeviceInfoImpl.getInstance(AccelerometerSensor);
    };
    TrikRobotModelBase.prototype.ledInfo = function () {
        return DeviceInfoImpl.getInstance(TrikLed);
    };
    TrikRobotModelBase.prototype.lineSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikLineSensor);
    };
    TrikRobotModelBase.prototype.colorSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikColorSensor);
    };
    TrikRobotModelBase.prototype.objectSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikObjectSensor);
    };
    TrikRobotModelBase.prototype.shellInfo = function () {
        return DeviceInfoImpl.getInstance(TrikShell);
    };
    TrikRobotModelBase.prototype.gamepadButtonInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadButton);
    };
    TrikRobotModelBase.prototype.gamepadPadInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadPad);
    };
    TrikRobotModelBase.prototype.gamepadPadPressSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadPadPressSensor);
    };
    TrikRobotModelBase.prototype.gamepadWheelInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadWheel);
    };
    TrikRobotModelBase.prototype.gamepadConnectionIndicatorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadConnectionIndicator);
    };
    return TrikRobotModelBase;
})(CommonRobotModelImpl);
var TrikColorSensor = (function (_super) {
    __extends(TrikColorSensor, _super);
    function TrikColorSensor() {
        _super.apply(this, arguments);
    }
    TrikColorSensor.parentType = VectorSensor;
    TrikColorSensor.name = "trikColorSensor";
    TrikColorSensor.friendlyName = "Color Sensor";
    return TrikColorSensor;
})(VectorSensor);
var TrikDisplay = (function (_super) {
    __extends(TrikDisplay, _super);
    function TrikDisplay() {
        _super.apply(this, arguments);
    }
    TrikDisplay.parentType = Display;
    return TrikDisplay;
})(Display);
var TrikGamepadButton = (function (_super) {
    __extends(TrikGamepadButton, _super);
    function TrikGamepadButton() {
        _super.apply(this, arguments);
    }
    TrikGamepadButton.parentType = Button;
    TrikGamepadButton.name = "gamepadButton";
    TrikGamepadButton.friendlyName = "Android Gamepad Button";
    return TrikGamepadButton;
})(Button);
var TrikGamepadConnectionIndicator = (function (_super) {
    __extends(TrikGamepadConnectionIndicator, _super);
    function TrikGamepadConnectionIndicator() {
        _super.apply(this, arguments);
    }
    TrikGamepadConnectionIndicator.parentType = ScalarSensor;
    TrikGamepadConnectionIndicator.name = "gamepadConnectionIndicator";
    TrikGamepadConnectionIndicator.friendlyName = "Android Gamepad Connection Indicator";
    return TrikGamepadConnectionIndicator;
})(ScalarSensor);
var TrikGamepadPad = (function (_super) {
    __extends(TrikGamepadPad, _super);
    function TrikGamepadPad() {
        _super.apply(this, arguments);
    }
    TrikGamepadPad.parentType = VectorSensor;
    TrikGamepadPad.name = "gamepadPad";
    TrikGamepadPad.friendlyName = "Android Gamepad Pad";
    return TrikGamepadPad;
})(VectorSensor);
var TrikGamepadPadPressSensor = (function (_super) {
    __extends(TrikGamepadPadPressSensor, _super);
    function TrikGamepadPadPressSensor() {
        _super.apply(this, arguments);
    }
    TrikGamepadPadPressSensor.parentType = Button;
    TrikGamepadPadPressSensor.name = "gamepadPadPressSensor";
    TrikGamepadPadPressSensor.friendlyName = "Android Gamepad Pad as Button";
    return TrikGamepadPadPressSensor;
})(Button);
var TrikGamepadWheel = (function (_super) {
    __extends(TrikGamepadWheel, _super);
    function TrikGamepadWheel() {
        _super.apply(this, arguments);
    }
    TrikGamepadWheel.parentType = ScalarSensor;
    TrikGamepadWheel.name = "gamepadWheel";
    TrikGamepadWheel.friendlyName = "Android Gamepad Wheel";
    return TrikGamepadWheel;
})(ScalarSensor);
var TrikInfraredSensor = (function (_super) {
    __extends(TrikInfraredSensor, _super);
    function TrikInfraredSensor() {
        _super.apply(this, arguments);
    }
    TrikInfraredSensor.parentType = RangeSensor;
    TrikInfraredSensor.name = "infrared";
    TrikInfraredSensor.friendlyName = "Infrared Sensor";
    return TrikInfraredSensor;
})(RangeSensor);
var TrikLed = (function (_super) {
    __extends(TrikLed, _super);
    function TrikLed() {
        _super.apply(this, arguments);
    }
    TrikLed.parentType = DeviceImpl;
    TrikLed.name = "led";
    TrikLed.friendlyName = "Led";
    return TrikLed;
})(DeviceImpl);
var TrikLineSensor = (function (_super) {
    __extends(TrikLineSensor, _super);
    function TrikLineSensor() {
        _super.apply(this, arguments);
    }
    TrikLineSensor.parentType = VectorSensor;
    TrikLineSensor.name = "trikLineSensor";
    TrikLineSensor.friendlyName = "Line Sensor";
    return TrikLineSensor;
})(VectorSensor);
var TrikMotionSensor = (function (_super) {
    __extends(TrikMotionSensor, _super);
    function TrikMotionSensor() {
        _super.apply(this, arguments);
    }
    TrikMotionSensor.parentType = ScalarSensor;
    TrikMotionSensor.name = "motion";
    TrikMotionSensor.friendlyName = "Motion Sensor";
    return TrikMotionSensor;
})(ScalarSensor);
var TrikObjectSensor = (function (_super) {
    __extends(TrikObjectSensor, _super);
    function TrikObjectSensor() {
        _super.apply(this, arguments);
    }
    TrikObjectSensor.parentType = VectorSensor;
    TrikObjectSensor.name = "trikObjectSensor";
    TrikObjectSensor.friendlyName = "Object Sensor";
    return TrikObjectSensor;
})(VectorSensor);
var TrikPowerMotor = (function (_super) {
    __extends(TrikPowerMotor, _super);
    function TrikPowerMotor() {
        _super.apply(this, arguments);
    }
    TrikPowerMotor.parentType = Motor;
    TrikPowerMotor.name = "power";
    TrikPowerMotor.friendlyName = "Power Motor";
    return TrikPowerMotor;
})(Motor);
var TrikServoMotor = (function (_super) {
    __extends(TrikServoMotor, _super);
    function TrikServoMotor() {
        _super.apply(this, arguments);
    }
    TrikServoMotor.parentType = Motor;
    TrikServoMotor.name = "servo";
    TrikServoMotor.friendlyName = "Servo Motor";
    return TrikServoMotor;
})(Motor);
var TrikShell = (function (_super) {
    __extends(TrikShell, _super);
    function TrikShell() {
        _super.apply(this, arguments);
    }
    TrikShell.parentType = DeviceImpl;
    TrikShell.name = "shell";
    TrikShell.friendlyName = "Shell";
    return TrikShell;
})(DeviceImpl);
var TrikSonarSensor = (function (_super) {
    __extends(TrikSonarSensor, _super);
    function TrikSonarSensor() {
        _super.apply(this, arguments);
    }
    TrikSonarSensor.parentType = RangeSensor;
    TrikSonarSensor.friendlyName = "Sonic Sensor";
    return TrikSonarSensor;
})(RangeSensor);
var TrikSpeaker = (function (_super) {
    __extends(TrikSpeaker, _super);
    function TrikSpeaker() {
        _super.apply(this, arguments);
    }
    TrikSpeaker.parentType = Speaker;
    return TrikSpeaker;
})(Speaker);
var TwoDRobotModel = (function (_super) {
    __extends(TwoDRobotModel, _super);
    function TwoDRobotModel(realModel, name) {
        _super.call(this);
        var twoDRobotModel = this;
        this.realModel = realModel;
        this.name = name;
        this.image = "images/2dmodel/trikKit/trikTwoDRobot.svg";
        realModel.getAvailablePorts().forEach(function (port) {
            twoDRobotModel.addAllowedConnection(port, realModel.getAllowedDevices(port));
        });
    }
    TwoDRobotModel.prototype.sensorImagePath = function (deviceType) {
        if (deviceType.isA(LightSensor)) {
            return "images/2dmodel/trikKit/twoDColorEmpty.svg";
        }
        else if (deviceType.isA(TrikInfraredSensor)) {
            return "images/2dmodel/trikKit/twoDIrRangeSensor.svg";
        }
        else if (deviceType.isA(TrikSonarSensor)) {
            return "images/2dmodel/trikKit/twoDUsRangeSensor.svg";
        }
        else if (deviceType.isA(TrikLineSensor)) {
            return "images/2dmodel/trikKit/twoDVideoModule.svg";
        }
        return null;
    };
    TwoDRobotModel.prototype.getName = function () {
        return this.name;
    };
    TwoDRobotModel.prototype.getRobotImage = function () {
        return this.image;
    };
    TwoDRobotModel.prototype.getConfigurablePorts = function () {
        return this.realModel.getConfigurablePorts();
    };
    return TwoDRobotModel;
})(CommonRobotModelImpl);
var Direction;
(function (Direction) {
    Direction[Direction["input"] = 0] = "input";
    Direction[Direction["output"] = 1] = "output";
})(Direction || (Direction = {}));
var ReservedVariableType;
(function (ReservedVariableType) {
    ReservedVariableType[ReservedVariableType["scalar"] = 0] = "scalar";
    ReservedVariableType[ReservedVariableType["vector"] = 1] = "vector";
})(ReservedVariableType || (ReservedVariableType = {}));
var TwoDPosition = (function () {
    function TwoDPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    return TwoDPosition;
})();
//# sourceMappingURL=out.js.map