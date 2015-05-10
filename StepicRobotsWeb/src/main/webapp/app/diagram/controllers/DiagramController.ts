class DiagramController {
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nameTypeMap: {string?: string} = {};
    private nodesMap = {};
    private currentNode: DiagramNode;
    private isPaletteLoaded = false;
    private taskId: string;
    private rootController: RootDiagramController;

    constructor($scope, $compile, $attrs) {
        var controller: DiagramController = this;
        $scope.vm = controller;
        this.rootController = $scope.root;

        controller.taskId = $attrs.task;
        PaletteLoader.loadElementsFromXml(controller, "tasks/" + controller.taskId + "/elements.xml", $scope, $compile);

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

        $scope.submit = function() { controller.submit($scope) };
    }

    setNodeTypesMap(nodeTypesMap: NodeTypesMap): void {
        this.nodeTypesMap = nodeTypesMap;
    }

    setNameTypeMap(nameTypeMap: {string?: string}): void {
        this.nameTypeMap = nameTypeMap;
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
        this.initDragAndDrop();
        this.isPaletteLoaded = true;
        this.afterPaletteLoaded();
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
                var name: string = $(ui.draggable.context).text();
                var type = controller.nameTypeMap[name];
                var image: string = controller.nodeTypesMap[type].image;
                var properties: PropertiesMap = controller.nodeTypesMap[type].properties;
                var node = controller.createNode(type, leftElementPos, topElementPos, properties, image);
                controller.currentNode = node;
                controller.setNodeProperties(node);
            }
        });
    }

    setNodeProperties(node: DiagramNode): void {
        var properties: PropertiesMap = node.getProperties();
        var content: string = '';
        for (var property in properties) {
            content += this.getPropertyHtml(node.getType(), properties[property]);
        }
        $('#property_table tbody').html(content);
    }

    getPropertyHtml(typeName, property: Property): string {
        return PropertyManager.getPropertyHtml(typeName, property);
    }

    afterPaletteLoaded() {
        this.setInputStringListener();
        this.setCheckboxListener();
        this.setDropdownListener();
        this.setSpinnerListener();
        this.makeUnselectable(document.getElementById("diagramContent"));
        this.openDiagram(this.taskId);
    }

    createNode(type: string, x: number, y: number, properties: PropertiesMap, image: string): DiagramNode {
        var node: DiagramNode = new DefaultDiagramNode(type, x, y, properties, image);
        this.nodesMap[node.getElement().id] = node;
        this.graph.addCell(node.getElement());

        return node;
    }

    clear(): void {
        this.graph.clear();
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

    submit($scope): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'submit',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({id: controller.taskId})),
            success: function (response) {
                $scope.$emit("emitDisplayTrace", response);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
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
            data: (ExportManager.exportDiagramStateToJSON(this.graph, name, this.nodesMap)),
            success: function (response) {
                console.log(response.message);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    openDiagram(taskId: string): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'open',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({id: taskId})),
            success: function (response) {
                controller.clear();
                DiagramLoader.load(response, controller.graph, controller.nodesMap, controller.nodeTypesMap);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }
}