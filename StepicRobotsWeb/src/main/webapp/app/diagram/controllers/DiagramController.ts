class DiagramController {
    static robotsDiagramNode: RobotsDiagramNode;
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this, this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nameTypeMap: {string?: string} = {};
    private nodesMap = {};
    private propertyNameMap: {string?: string};
    private linksMap = {};
    private currentElement: DiagramElement
    private isPaletteLoaded = false;
    private taskId: string;
    private rootController: RootDiagramController;
    private paperZoom: number = 0.8;

    constructor($scope, $compile, $attrs) {
        this.paper.scale(this.paperZoom, this.paperZoom);
        var controller: DiagramController = this;
        $scope.vm = controller;
        this.rootController = $scope.root;

        controller.taskId = $attrs.task;
        PaletteLoader.loadElementsFromXml(controller, $scope, $compile, $attrs);

        DropdownListManager.addDropdownList("ControlFlow", "Guard", ["", "false", "iteration", "true"]);

        this.initDeleteListener();

        this.makeUnselectable(document.getElementById("diagramContent"));

        this.paper.on('cell:pointerdown',
            function (cellView, event, x, y) {
                if (!($(event.target).parents(".custom-menu").length > 0)) {
                    $(".custom-menu").hide(100);
                }

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

                if (event.button == 2) {
                    $(".custom-menu").finish().toggle(100).
                        css({
                            left: event.clientX + "px",
                            top: event.clientY + "px"
                        });
                }
            }
        );
        this.paper.on('blank:pointerdown',
            function (evt, x, y) {
                if (!($(event.target).parents(".custom-menu").length > 0)) {
                    $(".custom-menu").hide(100);
                }
                $(".property").remove();
                controller.currentElement = undefined;
            }
        );

        $scope.submit = function() { controller.submit($scope) };
        $('#diagramSpinner').hide();
        $('#twoDModelSpinner').hide();

        this.initCustomContextMenu();
    }

    initCustomContextMenu(): void {
        var controller = this;
        $("#diagramContent").bind("contextmenu", function (event) {
            event.preventDefault();
        });

        $(".custom-menu li").click(function(){
            switch($(this).attr("data-action")) {
                case "delete":
                    controller.removeCurrentElement();
                    break;
            }

            $(".custom-menu").hide(100);
        });
    }

    initDeleteListener(): void {
        var controller = this;
        var deleteKey: number = 46;
        $('html').keyup(function(e){
            if(e.keyCode == deleteKey) {
                if(!(document.activeElement.tagName === "INPUT")) {
                    console.log(document.activeElement.tagName);
                    controller.removeCurrentElement();
                }
            }
        });
    }

    setNodeTypesMap(nodeTypesMap: NodeTypesMap): void {
        this.nodeTypesMap = nodeTypesMap;
    }

    setNameTypeMap(nameTypeMap: {string?: string}): void {
        this.nameTypeMap = nameTypeMap;
    }

    setPropertyNameMap(propertyNameMap: {string?: string}) {
        this.propertyNameMap = propertyNameMap;
        this.propertyNameMap["Guard"] = "Guard"
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

    initPalette($scope) {
        this.initDragAndDrop();
        this.isPaletteLoaded = true;
        this.afterPaletteLoaded($scope);
    }

    setInputStringListener(): void {
        var controller: DiagramController = this;
        $(document).on('input', '.form-control', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var key = controller.propertyNameMap[name];
            var value = $(this).val();
            var property: Property = controller.currentElement.getProperties()[key];
            property.value = value;
            controller.currentElement.setProperty(key, property);
        });
    }

    setCheckboxListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.checkbox', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var key = controller.propertyNameMap[name];
            var label = tr.find('label');
            var value = label.contents().last()[0].textContent;
            if (value === "True") {
                value = "False"
                label.contents().last()[0].textContent = value;
            } else {
                value = "True"
                label.contents().last()[0].textContent = value;
            }
            var property: Property = controller.currentElement.getProperties()[key];
            property.value = value;
            controller.currentElement.setProperty(key, property);
        });
    }

    setDropdownListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.mydropdown', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var key = controller.propertyNameMap[name];
            var value = $(this).val();
            var property: Property = controller.currentElement.getProperties()[key];
            property.value = value;
            controller.currentElement.setProperty(key, property);
        });
    }

    setSpinnerListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.spinner', function () {
            var tr = $(this).closest('tr');
            var name = tr.find('td:first').html();
            var key = controller.propertyNameMap[name];
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property: Property = controller.currentElement.getProperties()[key];
                property.value = value;
                controller.currentElement.setProperty(key, property);
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
                var topElementPos: number = (ui.offset.top - $(this).offset().top + $(this).scrollTop()) / controller.paperZoom;
                var leftElementPos: number = (ui.offset.left - $(this).offset().left + $(this).scrollLeft()) / controller.paperZoom;
                var gridSize: number = controller.paper.getGridSizeValue();
                topElementPos -= topElementPos % gridSize;
                leftElementPos -= leftElementPos % gridSize;
                var name: string = $(ui.draggable.context).text();
                var type = controller.nameTypeMap[name];
                var image: string = controller.nodeTypesMap[type].image;

                var typeProperties: PropertiesMap = controller.nodeTypesMap[type].properties;

                var nodeProperties: PropertiesMap = {};
                for (var property in typeProperties) {
                    nodeProperties[property] = new Property(typeProperties[property].name,
                        typeProperties[property].value, typeProperties[property].type);
                }

                var node = controller.createNode(name, type, leftElementPos, topElementPos, nodeProperties, image);
                controller.currentElement = node;
                controller.setNodeProperties(node);
            }
        });
    }

    private setNodeProperties(element): void {
        $('#property_table tbody').empty();
        var properties: PropertiesMap = element.getProperties();
        for (var property in properties) {
            var newItem = $(this.getPropertyHtml(element.getType(), properties[property]));
            $('#property_table tbody').append(newItem);

            if (properties[property].type === "combobox") {
                this.initCombobox(element.getType(), property, newItem);
            }
        }
    }

    private initCombobox(typeName: string, propertyName: string, element) {
        var dropdownList = DropdownListManager.getDropdownList(typeName, propertyName);

        var controller: DiagramController = this;

        element.find('input').autocomplete({
            source: dropdownList,
            minLength: 0,
            select: function (event, ui) {
                var tr = $(this).closest('tr');
                var name = tr.find('td:first').html();
                var value = ui.item.value;;
                var property: Property = controller.currentElement.getProperties()[name];
                property.value = value;
                controller.currentElement.setProperty(name, property);
            }
        }).focus(function() {
            $(this).autocomplete("search", $(this).val());
        });
    }

    getPropertyHtml(typeName, property: Property): string {
        return PropertyManager.getPropertyHtml(typeName, property);
    }

    afterPaletteLoaded($scope) {
        this.setInputStringListener();
        this.setCheckboxListener();
        this.setDropdownListener();
        this.setSpinnerListener();
        this.makeUnselectable(document.getElementById("paletteContent"));
        this.openDiagram($scope, this.taskId);
    }

    addLink(linkId: string, linkObject: Link) {
        this.linksMap[linkId] = linkObject;
    }

    createNode(name: string, type: string, x: number, y: number, properties: PropertiesMap,
                      imagePath: string, id?: string): DiagramNode {
        var node: DiagramNode = new DefaultDiagramNode(name, type, x, y, properties, imagePath, id);
        this.nodesMap[node.getJointObject().id] = node;
        this.graph.addCell(node.getJointObject());
        return node;
    }

    clear(): void {
        this.graph.clear();
        this.nodesMap = {};
        this.linksMap = {};
        $(".property").remove();
        this.currentElement = undefined;
    }

    removeCurrentElement(): void {
        var controller = this;
        if (this.currentElement) {
            var node = this.nodesMap[this.currentElement.getJointObject().id];
            if (node) {
                var links = this.graph.getConnectedLinks(node.getJointObject(), { inbound: true, outbound: true });

                links.forEach(function (link) {
                    delete controller.linksMap[link.id];
                });

                delete this.nodesMap[this.currentElement.getJointObject().id];
            } else {
                var link = this.linksMap[this.currentElement.getJointObject().id];
                if (link) {
                    delete this.linksMap[this.currentElement.getJointObject().id];
                }
            }
            this.currentElement.getJointObject().remove();
            $(".property").remove();
            this.currentElement = undefined;
        }
    }

    submit($scope): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        $("#infoAlert").hide();
        var twoDModelSpinner = $('#twoDModelSpinner');
        twoDModelSpinner.show();
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'submit/' + controller.taskId,
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({diagram: ExportManager.exportDiagramStateToJSON(controller.graph,
                controller.nodesMap, controller.linksMap)})),
            success: function (response) {
                twoDModelSpinner.hide();
                $scope.$emit("emitCheckingResult", response);
            },
            error: function (response, status, error) {
                twoDModelSpinner.hide();
                console.log("error: " + status + " " + error);
            }
        });
    }

    openDiagram($scope, taskId: string): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var diagramSpinner = $('#diagramSpinner');
        diagramSpinner.show();
        var twoDModelSpinner = $('#twoDModelSpinner');
        twoDModelSpinner.show();
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'open/' + taskId,
            success: function (response) {
                controller.clear();
                diagramSpinner.hide();
                twoDModelSpinner.hide();
                $scope.$emit("emit2dModelLoad", response.fieldXML);
                DiagramLoader.load(response.diagram, controller.graph,
                    controller.nodesMap, controller.linksMap, controller.nodeTypesMap);
            },
            error: function (response, status, error) {
                diagramSpinner.hide();
                twoDModelSpinner.hide();
                console.log("error: " + status + " " + error);
            }
        });
    }
}