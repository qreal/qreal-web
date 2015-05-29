class DiagramController {
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this, this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nodesMap = {};
    private linksMap = {};
    private currentElement: DiagramElement;
    private isPaletteLoaded = false;

    constructor($scope, $compile) {
        var controller: DiagramController = this;
        $scope.vm = controller;
        PaletteLoader.loadElementsFromXml(this, "configs/elements.xml", $scope, $compile);

        DropdownListManager.addDropdownList("Link", "Guard", ["", "false", "iteration", "true"]);

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

        $scope.$on("interpret", function(event, timeline) {
            console.log(InterpretManager.interpret(controller.graph, controller.nodesMap, controller.linksMap, timeline));
        });
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
                var type: string = $(ui.draggable.context).text();
                var image: string = controller.nodeTypesMap[type].image;
                var properties: PropertiesMap = controller.nodeTypesMap[type].properties;

                ///////////////////////////////////////////////////////////////////////////////////
                var newProperties: PropertiesMap = {};
                for (var prop in properties) {
                    newProperties[prop] = new Property("", properties[prop].type);
                }
                ///////////////////////////////////////////////////////////////////////////////////

                var node = controller.createDefaultNode(type, leftElementPos, topElementPos, newProperties, image);
                controller.currentElement = node;
                controller.setNodeProperties(node);
            }
        });
    }

    setNodeProperties(element): void {
        var properties: PropertiesMap = element.getProperties();
        var content: string = '';
        for (var property in properties) {
            content += this.getPropertyHtml(element.getType(), property, properties[property]);
        }
        $('#property_table tbody').html(content);
    }

    getPropertyHtml(typeName, propertyName: string, property: Property): string {
        return PropertyManager.getPropertyHtml(typeName, propertyName, property);
    }

    addLink(linkId: string, linkObject: Link) {
        this.linksMap[linkId] = linkObject;
    }

    createDefaultNode(type: string, x: number, y: number, properties: PropertiesMap,
                      imagePath: string, id?: string): DefaultDiagramNode {
        var node: DefaultDiagramNode = new DefaultDiagramNode(type, x, y, properties, imagePath, id);
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
            data: (ExportManager.exportDiagramStateToJSON(name, this.nodesMap, this.linksMap)),
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
                ImportManager.import(response, controller.graph, controller.nodesMap,
                    controller.linksMap, controller.nodeTypesMap);
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