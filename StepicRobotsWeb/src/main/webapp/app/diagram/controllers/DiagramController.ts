class DiagramController {
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this, this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nameTypeMap: {string?: string} = {};
    private nodesMap = {};
    private linksMap = {};
    private currentElement: DiagramElement
    private isPaletteLoaded = false;
    private taskId: string;
    private rootController: RootDiagramController;

    constructor($scope, $compile, $attrs) {
        var controller: DiagramController = this;
        $scope.vm = controller;
        this.rootController = $scope.root;

        controller.taskId = $attrs.task;
        PaletteLoader.loadElementsFromXml(controller, "tasks/" + controller.taskId + "/elements.xml", $scope, $compile);

        DropdownListManager.addDropdownList("Link", "Guard", ["", "fasle", "iteration", "true"]);

        this.paper.on('cell:pointerdown',
            function (cellView, evt, x, y) {
                console.log('cell view ' + cellView.model.id + ' was clicked');

                var node: DiagramNode = controller.nodesMap[cellView.model.id];
                if (node) {
                    controller.currentElement = node;
                    controller.setNodeProperties(node);
                } else {
                    var link: Link = controller.linksMap[cellView.model.id];
                    if (link) {
                        controller.currentElement = link;
                        controller.setNodeProperties(link);
                    } else {
                        controller.currentElement = undefined;
                    }
                }
            }
        );
        this.paper.on('blank:pointerdown',
            function (evt, x, y) {
                console.log('blank was clicked');
                $(".property").remove();
                controller.currentElement = undefined;
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
            var property: Property = controller.currentElement.getProperties()[name];
            property.value = value;
            controller.currentElement.setProperty(name, property);
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
            var property: Property = controller.currentElement.getProperties()[name];
            property.value = value;
            controller.currentElement.setProperty(name, property);
        });
    }

    setDropdownListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.mydropdown', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            var property: Property = controller.currentElement.getProperties()[name];
            property.value = value;
            controller.currentElement.setProperty(name, property);
        });
    }

    setSpinnerListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.spinner', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property: Property = controller.currentElement.getProperties()[name];
                property.value = value;
                controller.currentElement.setProperty(name, property);
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
                controller.currentElement = node;
                controller.setNodeProperties(node);
            }
        });
    }

    setNodeProperties(element: DiagramElement): void {
        var properties: PropertiesMap = element.getProperties();
        var content: string = '';
        for (var property in properties) {
            content += this.getPropertyHtml(element.getType(), properties[property]);
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


    addLink(linkId: string, linkObject: Link) {
        this.linksMap[linkId] = linkObject;
    }

    createNode(type: string, x: number, y: number, properties: PropertiesMap,
                      imagePath: string, id?: string): DiagramNode {
        var node: DiagramNode = new DefaultDiagramNode(type, x, y, properties, imagePath, id);
        this.nodesMap[node.getJointObject().id] = node;
        this.graph.addCell(node.getJointObject());
        return node;
    }

    clear(): void {
        this.graph.clear();
        this.nodesMap = {};
        $(".property").remove();
        this.currentElement = undefined;
    }

    removeCurrentElement(): void {
        if (this.currentElement) {
            var node = this.nodesMap[this.currentElement.getJointObject().id];
            if (node) {
                delete this.nodesMap[this.currentElement.getJointObject().id];
                this.currentElement.getJointObject().remove();
                $(".property").remove();
                this.currentElement = undefined;
            }
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
                DiagramLoader.load(response, controller.graph,
                    controller.nodesMap, controller.linksMap, controller.nodeTypesMap);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }
}