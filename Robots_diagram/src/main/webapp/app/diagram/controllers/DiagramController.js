var DiagramController = (function () {
    function DiagramController($scope, $compile) {
        this.graph = new joint.dia.Graph;
        this.paper = new DiagramPaper(this, this.graph);
        this.nodeTypesMap = {};
        this.nodesMap = {};
        this.linksMap = {};
        this.isPaletteLoaded = false;
        var controller = this;
        $scope.vm = controller;
        PaletteLoader.loadElementsFromXml(this, "configs/elements.xml", $scope, $compile);
        DropdownListManager.addDropdownList("Link", "Guard", ["", "false", "iteration", "true"]);
        this.paper.on('cell:pointerdown', function (cellView, evt, x, y) {
            console.log('cell view ' + cellView.model.id + ' was clicked');
            var node = controller.nodesMap[cellView.model.id];
            if (node) {
                controller.currentElement = node;
                controller.setNodeProperties(node);
            }
            else {
                var link = controller.linksMap[cellView.model.id];
                if (link) {
                    controller.currentElement = link;
                    controller.setNodeProperties(link);
                }
                else {
                    controller.currentElement = undefined;
                }
            }
        });
        this.paper.on('blank:pointerdown', function (evt, x, y) {
            console.log('blank was clicked');
            $(".property").remove();
            controller.currentElement = undefined;
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
        this.isPaletteLoaded = true;
    };
    DiagramController.prototype.setInputStringListener = function () {
        var controller = this;
        $(document).on('change', '.form-control', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property = controller.currentElement.getProperties()[name];
            property.value = value;
            controller.currentElement.setProperty(name, property);
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
            var property = controller.currentElement.getProperties()[name];
            property.value = value;
            controller.currentElement.setProperty(name, property);
        });
    };
    DiagramController.prototype.setDropdownListener = function () {
        var controller = this;
        $(document).on('change', '.mydropdown', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property = controller.currentElement.getProperties()[name];
            property.value = value;
            controller.currentElement.setProperty(name, property);
        });
    };
    DiagramController.prototype.setSpinnerListener = function () {
        var controller = this;
        $(document).on('change', '.spinner', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property = controller.currentElement.getProperties()[name];
                property.value = value;
                controller.currentElement.setProperty(name, property);
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
                controller.currentElement = node;
                controller.setNodeProperties(node);
            }
        });
    };
    DiagramController.prototype.setNodeProperties = function (element) {
        var properties = element.getProperties();
        var content = '';
        for (var property in properties) {
            content += this.getPropertyHtml(element.getType(), property, properties[property]);
        }
        $('#property_table tbody').html(content);
    };
    DiagramController.prototype.getPropertyHtml = function (typeName, propertyName, property) {
        return PropertyManager.getPropertyHtml(typeName, propertyName, property);
    };
    DiagramController.prototype.addLink = function (linkId, linkObject) {
        this.linksMap[linkId] = linkObject;
    };
    DiagramController.prototype.createDefaultNode = function (type, x, y, properties, imagePath, id) {
        var node = new DefaultDiagramNode(type, x, y, properties, imagePath, id);
        this.nodesMap[node.getJointObject().id] = node;
        this.graph.addCell(node.getJointObject());
        return node;
    };
    DiagramController.prototype.clear = function () {
        this.graph.clear();
        this.nodesMap = {};
        $(".property").remove();
        this.currentElement = undefined;
    };
    DiagramController.prototype.removeCurrentElement = function () {
        if (this.currentElement) {
            var node = this.nodesMap[this.currentElement.getJointObject().id];
            if (node) {
                delete this.nodesMap[this.currentElement.getJointObject().id];
                this.currentElement.getJointObject().remove();
                $(".property").remove();
                this.currentElement = undefined;
            }
        }
    };
    DiagramController.prototype.saveDiagram = function () {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var name = prompt("input name");
        $.ajax({
            type: 'POST',
            url: 'save',
            dataType: 'json',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramStateToJSON(name, this.nodesMap, this.linksMap)),
            success: function (response) {
                console.log(response.message);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    };
    DiagramController.prototype.openDiagram = function () {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
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
                ImportManager.import(response, controller.graph, controller.nodesMap, controller.linksMap, controller.nodeTypesMap);
            },
            error: function (response, status, error) {
                if (status === "parsererror") {
                    alert("Diagram with this name does not exist");
                }
                console.log("error: " + status + " " + error);
            }
        });
    };
    DiagramController.prototype.interpretDiagram = function () {
        alert(InterpretManager.interpret(this.graph, this.nodesMap));
    };
    DiagramController.prototype.openTwoDModel = function () {
        $("#diagramContent").hide();
        $("#twoDModelContent").show();
    };
    return DiagramController;
})();
//# sourceMappingURL=DiagramController.js.map