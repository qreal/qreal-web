class DiagramController {
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nodesList = {};
    private currentNode: DiagramNode;
    private nodeIndex: number = -1;

    constructor($scope, $compile) {
        var controller: DiagramController = this;
        $scope.vm = controller;
        controller.nodeTypesMap = XmlManager.loadElementsFromXml("configs/elements.xml", $scope, $compile);

        this.paper.on('cell:pointerdown',
            function (cellView, evt, x, y) {
                console.log('cell view ' + cellView.model.id + ' was clicked');

                var node:DiagramNode = controller.nodesList[cellView.model.id];
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

        this.setInputStringListener(controller);
        this.setCheckboxListener(controller);
        this.setDropdownListener(controller);
        this.setSpinnerListener(controller);

        this.initDragAndDrop(controller);
    }

    setInputStringListener(controller: DiagramController): void {
        $(document).on('change', '.form-control', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property: Property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    }

    setCheckboxListener(controller: DiagramController): void {
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

    setDropdownListener(controller: DiagramController): void {
        $(document).on('change', '.mydropdown', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property: Property = controller.currentNode.getProperties()[name];
            property.value = value;
            controller.currentNode.setProperty(name, property);
        });
    }

    setSpinnerListener(controller: DiagramController): void {
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

    initDragAndDrop(controller: DiagramController): void {
        $(".tree_element").draggable({
            helper: function () {
                return $(this).find('.elementImg').clone();
            },
            revert:"invalid"
        });

        $("#diagram_paper").droppable({
            drop: function(event, ui) {
                var paperPos: { top: number; left: number;} = $("#diagram_paper").position();
                var topElementPos: number = ui.position.top - paperPos.top;
                var leftElementPos: number = ui.position.left - paperPos.left;
                var gridSize: number = controller.paper.getGridSizeValue();
                topElementPos -= topElementPos % gridSize;
                leftElementPos -= leftElementPos % gridSize;
                var type: string = $(ui.draggable.context).text();
                var image: string = controller.nodeTypesMap[type].image;
                var properties: PropertiesMap = controller.nodeTypesMap[type].properties;
                controller.createDefaultNode(type, leftElementPos, topElementPos, properties, image);
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

    createDefaultNode(type: string, x: number, y: number, properties: PropertiesMap, image: string): void {
        this.nodeIndex++;
        var name: string = "Node" + this.nodeIndex;
        var node: DefaultDiagramNode = new DefaultDiagramNode(name, type, x, y, properties, image);
        this.nodesList[node.getElement().id] = node;
        this.graph.addCell(node.getElement());
    }

    clear(): void {
        this.graph.clear();
        this.nodeIndex = -1;
        this.nodesList = {};
        $(".property").remove();
        this.currentNode = undefined;
    }

    removeCurrentElement(): void {
        if (this.currentNode) {
            console.log("Node was deleted");
            delete this.nodesList[this.currentNode.getElement().id];
            this.currentNode.getElement().remove();
            $(".property").remove();
            this.currentNode = undefined;
        }
    }

    saveDiagram(): void {
        var name: string = prompt("input name");
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
    }

    openDiagram(): void {
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
                controller.nodeIndex = ImportManager.import(response, controller.graph, controller.nodesList);
                console.log(response.nodeIndex);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    openTwoDModel(): void {
        $("#diagramContent").hide();
        $("#twoDModelContent").show();
    }
}