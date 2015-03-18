angular.module('diagram', ['controllers']);
var Controllers;
(function (Controllers) {
    var DiagramController = (function () {
        function DiagramController($scope, $compile) {
            this.graph = new joint.dia.Graph;
            this.paper = new DiagramPaper(this.graph);
            this.nodeTypesMap = {};
            this.nodesList = {};
            this.nodeIndex = -1;
            var controller = this;
            $scope.vm = controller;
            controller.nodeTypesMap = XmlManager.loadElementsFromXml("configs/elements.xml", $scope, $compile);
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
            this.setInputStringListener(controller);
            this.setCheckboxListener(controller);
            this.setDropdownListener(controller);
            this.setSpinnerListener(controller);
            this.initDragAndDrop(controller);
        }
        DiagramController.prototype.setInputStringListener = function (controller) {
            $(document).on('change', '.form-control', function () {
                var tr = $(this).closest('tr');
                var name = tr.find('td:first').html();
                var value = $(this).val();
                var property = controller.currentNode.getProperties()[name];
                property.value = value;
                controller.currentNode.setProperty(name, property);
            });
        };
        DiagramController.prototype.setCheckboxListener = function (controller) {
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
        DiagramController.prototype.setDropdownListener = function (controller) {
            $(document).on('change', '.mydropdown', function () {
                var tr = $(this).closest('tr');
                var name = tr.find('td:first').html();
                var value = $(this).val();
                var property = controller.currentNode.getProperties()[name];
                property.value = value;
                controller.currentNode.setProperty(name, property);
            });
        };
        DiagramController.prototype.setSpinnerListener = function (controller) {
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
        DiagramController.prototype.initDragAndDrop = function (controller) {
            $(".tree_element").draggable({
                helper: function () {
                    return $(this).find('.elementImg').clone();
                },
                revert: "invalid"
            });
            $("#paper").droppable({
                drop: function (event, ui) {
                    var paperPos = $("#paper").position();
                    var topElementPos = ui.position.top - paperPos.top;
                    var leftElementPos = ui.position.left - paperPos.left;
                    var gridSize = controller.paper.getGridSizeValue();
                    topElementPos -= topElementPos % gridSize;
                    leftElementPos -= leftElementPos % gridSize;
                    var type = $(ui.draggable.context).text();
                    var image = controller.nodeTypesMap[type].image;
                    var properties = controller.nodeTypesMap[type].properties;
                    controller.createDefaultNode(type, leftElementPos, topElementPos, properties, image);
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
        return DiagramController;
    })();
    Controllers.DiagramController = DiagramController;
})(Controllers || (Controllers = {}));
angular.module('controllers', []).controller(Controllers);
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
    XmlManager.loadXMLDoc = function (name) {
        var xmlDoc;
        if (XMLHttpRequest) {
            xmlDoc = new XMLHttpRequest();
            xmlDoc.open("GET", name, false);
            xmlDoc.send("");
            return xmlDoc.responseXML;
        }
        else {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.load(name);
            return xmlDoc;
        }
        alert("Error loading document!");
        return null;
    };
    XmlManager.addDropdownList = function (typeName, propertyName, variants) {
        var list = [];
        for (var i = 0; i < variants.length; i++) {
            list.push(variants[i].childNodes[0].nodeValue);
        }
        DropdownListManager.addDropdownList(typeName, propertyName, list);
    };
    XmlManager.loadElementsFromXml = function (pathToXML, $scope, $compile) {
        var xmlDoc = this.loadXMLDoc(pathToXML);
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
        return nodeTypesMap;
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DiagramPaper = (function (_super) {
    __extends(DiagramPaper, _super);
    function DiagramPaper(graph) {
        this.gridSizeValue = 25;
        _super.call(this, {
            el: $('#paper'),
            width: $('#paper').width(),
            height: $('#paper').height(),
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
                this.ox = this.attr("x");
                this.oy = this.attr("y");
                worldModel.setCurrentElement(pencilItem);
            }
            return this;
        }, movePath = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                var trans_x = dx - this.ox;
                var trans_y = dy - this.oy;
                this.transform("...T" + [trans_x, trans_y]);
                this.ox = dx;
                this.oy = dy;
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
    return PencilItemImpl;
})();
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
    return WallItemImpl;
})();
var ModelImpl = (function () {
    function ModelImpl($scope) {
        this.worldModel = new WorldModelImpl($scope);
    }
    ModelImpl.prototype.getWorldModel = function () {
        return this.worldModel;
    };
    ModelImpl.prototype.getTimeline = function () {
        return this.timeline;
    };
    ModelImpl.prototype.getRobotMode = function () {
        return this.robotModel;
    };
    ModelImpl.prototype.getSetting = function () {
        return this.settings;
    };
    return ModelImpl;
})();
var WorldModelImpl = (function () {
    function WorldModelImpl($scope) {
        this.drawMode = 0;
        this.currentElement = null;
        $scope.vm = this;
        var worldModel = this;
        $(document).ready(function () {
            worldModel.paper = Raphael("stage", "100%", "100%");
            $(worldModel.paper.canvas).attr("id", "paper");
            var wall_pattern = '<pattern id="wall_pattern" patternUnits="userSpaceOnUse" width="85" height="80">\
                                        <image xlink:href="images/2dmodel/2d_wall.png" width="85" height="80" />\
                                    </pattern>';
            $("body").append('<svg id="dummy" style="display:none"><defs>' + wall_pattern + '</defs></svg>');
            $("#paper defs").append($("#dummy pattern"));
            $("#dummy").remove();
            $('#confirmDelete').find('.modal-footer #confirm').on('click', function () {
                $('#confirmDelete').modal('hide');
            });
            var shape;
            var isDrawing = false;
            var startDrawPoint;
            $("#stage").mousedown(function (e) {
                switch (worldModel.drawMode) {
                    case 1:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new LineItemImpl(worldModel, x, y, x, y, width, color);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break;
                    case 2:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        shape = new WallItemImpl(worldModel, x, y, x, y);
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
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break;
                    default:
                }
            });
            $("#stage").mousemove(function (e) {
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
            $("#stage").mouseup(function (e) {
                if (isDrawing) {
                    isDrawing = false;
                }
                else {
                    if (e.target.nodeName === "svg") {
                        if (worldModel.currentElement) {
                            worldModel.currentElement.hideHandles();
                            worldModel.currentElement = null;
                        }
                    }
                }
            });
        });
    }
    WorldModelImpl.prototype.getMousePosition = function (e) {
        var offset = $("#stage").offset();
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
        this.paper.clear();
    };
    return WorldModelImpl;
})();
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
//# sourceMappingURL=out.js.map