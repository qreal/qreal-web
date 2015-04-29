class DiagramController {
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nodesMap = {};
    private currentNode: DiagramNode;
    private nodeIndex: number = -1;
    private isPaletteLoaded = false;

    constructor($scope, $compile) {
        var controller: DiagramController = this;
        $scope.vm = controller;
        PaletteLoader.loadElementsFromXml(this, "configs/elements.xml", $scope, $compile);

        this.paper.on('cell:pointerdown',
            function (cellView, evt, x, y) {
                console.log('cell view ' + cellView.model.id + ' was clicked');

                var node:DiagramNode = controller.nodesMap[cellView.model.id];
                if (node) {
                    controller.currentNode = node;
                    controller.setNodeProperties(node);
                } else {
                    controller.currentNode = undefined;
                }
            }
        );
        this.paper.on('blank:pointerdown',
            function (evt, x, y) {
                console.log('blank was clicked');
                $(".property").remove();
                controller.currentNode = undefined;
            }
        );
    }

    setNodeTypesMap(nodeTypesMap: NodeTypesMap): void {
        this.nodeTypesMap = nodeTypesMap;
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

    initPalette() {
        this.setInputStringListener();
        this.setCheckboxListener();
        this.setDropdownListener();
        this.setSpinnerListener();
        this.initDragAndDrop();
        this.makeUnselectable(document.getElementById("diagramContent"));
        this.isPaletteLoaded = true;
    }

    setInputStringListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.form-control', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property: Property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    }

    setCheckboxListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.checkbox', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var label = tr.find('label');
            var value = label.contents().last()[0].textContent;
            if (value === "True") {
                value = "False"
                label.contents().last()[0].textContent = value;
            } else {
                value = "True"
                label.contents().last()[0].textContent = value;
            }
            var property: Property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    }

    setDropdownListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.mydropdown', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property: Property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    }

    setSpinnerListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.spinner', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property: Property = controller.currentNode.getProperties()[name];
                property.value = value;
                controller.currentNode.setProperty(name, property);
            }
        });
    }

    initDragAndDrop(): void {
        var controller: DiagramController = this;
        $(".tree_element").draggable({
            helper: function () {
                var clone =  $(this).find('.elementImg').clone();
                clone.css('position','fixed');
                clone.css('z-index', '1000');
                return clone;
            },
            revert:"invalid"
        });

        $("#diagram_paper").droppable({
            drop: function(event, ui) {
                var topElementPos: number = ui.offset.top - $(this).offset().top + $(this).scrollTop();
                var leftElementPos: number = ui.offset.left - $(this).offset().left + $(this).scrollLeft();
                var gridSize: number = controller.paper.getGridSizeValue();
                topElementPos -= topElementPos % gridSize;
                leftElementPos -= leftElementPos % gridSize;
                var type: string = $(ui.draggable.context).text();
                var image: string = controller.nodeTypesMap[type].image;
                var properties: PropertiesMap = controller.nodeTypesMap[type].properties;
                var node = controller.createDefaultNode(type, leftElementPos, topElementPos, properties, image);
                controller.currentNode = node;
                controller.setNodeProperties(node);
            }
        });
    }

    setNodeProperties(node: DiagramNode): void {
        var properties: PropertiesMap = node.getProperties();
        var content: string = '';
        for (var property in properties) {
            content += this.getPropertyHtml(node.getType(), property, properties[property]);
        }
        $('#property_table tbody').html(content);
    }

    getPropertyHtml(typeName, propertyName: string, property: Property): string {
        return PropertyManager.getPropertyHtml(typeName, propertyName, property);
    }

    createDefaultNode(type: string, x: number, y: number, properties: PropertiesMap, image: string): DefaultDiagramNode {
        this.nodeIndex++;
        var name: string = "Node" + this.nodeIndex;
        var node: DefaultDiagramNode = new DefaultDiagramNode(name, type, x, y, properties, image);
        this.nodesMap[node.getElement().id] = node;
        this.graph.addCell(node.getElement());
        return node;
    }

    clear(): void {
        this.graph.clear();
        this.nodeIndex = -1;
        this.nodesMap = {};
        $(".property").remove();
        this.currentNode = undefined;
    }

    removeCurrentElement(): void {
        if (this.currentNode) {
            console.log("Node was deleted");
            delete this.nodesMap[this.currentNode.getElement().id];
            this.currentNode.getElement().remove();
            $(".property").remove();
            this.currentNode = undefined;
        }
    }

    saveDiagram(): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var name: string = prompt("input name");
        $.ajax({
            type: 'POST',
            url: 'save',
            dataType: 'json',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramStateToJSON(this.graph, name, this.nodeIndex, this.nodesMap)),
            success: function (response) {
                console.log(response.message);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    openDiagram(): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var controller = this;
        var name: string = prompt("input diagram name");
        $.ajax({
            type: 'POST',
            url: 'open',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({name: name})),
            success: function (response) {
                controller.clear();
                controller.nodeIndex = ImportManager.import(response, controller.graph,
                    controller.nodesMap, controller.nodeTypesMap);
                console.log(response.nodeIndex);
            },
            error: function (response, status, error) {
                if (status === "parsererror") {
                    alert("Diagram with this name does not exist");
                }
                console.log("error: " + status + " " + error);
            }
        });
    }

    openTwoDModel(): void {
        $("#diagramContent").hide();
        $("#twoDModelContent").show();
    }
}