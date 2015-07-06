class DiagramController {
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this, this.graph);

    private nodeTypesMap: NodeTypesMap = {};
    private nodesMap = {};
    private linksMap = {};
    private currentElement: DiagramElement;
    private isPaletteLoaded = false;
    private mouseupEvent;

    private diagramPaper : HTMLDivElement;
    private flagDraw : boolean = false;
    private list : utils.PairArray = [];
    private timer;
    private currentTime;
    private date : Date = new Date();
    private data : Gesture[];
    private flagAdd : boolean;

    constructor($scope, $compile) {

        var controller: DiagramController = this;
        $scope.vm = controller;
        PaletteLoader.loadElementsFromXml(this, "configs/elements.xml", $scope, $compile);

        DropdownListManager.addDropdownList("Link", "Guard", ["", "false", "iteration", "true"]);

        this.loadGestures();
        this.flagDraw = false;
        this.flagDraw = false;
        this.list = [];

        this.paper.on('cell:pointerdown',
            function (cellView, evt, x, y) {
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
                var n = controller.date.getTime();
                controller.currentTime = n;
                controller.flagAdd = false;
                clearTimeout(this.timer);
                controller.flagDraw = true;
                $(".property").remove();
                controller.currentElement = undefined;
            }
        );

        this.diagramPaper = <HTMLDivElement> document.getElementById('diagram_paper');
        this.onMouseUp = <any>controller.onMouseUp.bind(this);
        document.addEventListener('mouseup', this.onMouseUp.bind(this));

        this.onMouseUp = <any>controller.onMouseMove.bind(this);
        this.diagramPaper.addEventListener('mousemove', this.onMouseMove.bind(this));

    }

    private smoothing(pair1 : utils.Pair, pair2 : utils.Pair, diff : number) {
        var a = 1;
        var c = 0.0275; // 'a' and 'c' are empirical constants
        var b = Math.exp(-c * diff);
        return new utils.Pair(pair2.first * b + (1 - b) * pair1.first
            , pair2.second + (1 - b) * pair1.second);
    }

    private onMouseMove(e)
    {
        if (this.flagDraw === false)
            return;

        var p = new utils.Pair(e.pageX, e.pageY);
        if (this.flagAdd) {

            var currentPair = this.list[this.list.length - 1];
            var n = this.date.getTime();
            var diff = n - this.currentTime;
            this.currentTime = n;
            p = this.smoothing(currentPair, new utils.Pair(e.pageX, e.pageY), diff);

            $('#diagram_paper').line(currentPair.first, currentPair.second, p.first, p.second);
        }
        this.flagAdd = true;
        this.list.push(p);
    }

    private onMouseUp(e)
    {
        if (this.flagDraw === false)
            return;
        this.mouseupEvent = e;
        this.flagDraw = false;
        this.timer = setTimeout(() => this.finishDraw(), 1000);
    }

    private finishDraw()
    {
        if (this.flagDraw === true)
            return;
        var o = document.getElementsByClassName('pencil');
        for (var i = o.length; i > 0; i--) {
            o[i - 1].parentNode.removeChild(o[i - 1]);
        }
        var keyG = new KeyGiver(this);
        var newKey = keyG.getKey();
        this.list = [];
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
                value = "False";
                label.contents().last()[0].textContent = value;
            } else {
                value = "True";
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
                var node = controller.createDefaultNode(type, leftElementPos, topElementPos, properties, image);
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

    createNode(type): void {
        var image: string = this.nodeTypesMap[type].image;
        var properties: PropertiesMap = this.nodeTypesMap[type].properties;
        var node = this.createDefaultNode(type, 0, 0, properties, image);
        this.currentElement = node;
        this.setNodeProperties(node);
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

    interpretDiagram(): void {
        alert(InterpretManager.interpret(this.graph, this.nodesMap));
    }

    openTwoDModel(): void {
        $("#diagramContent").hide();
        $("#twoDModelContent").show();
    }

    // download file with gestures
    private downloadData(url, success) {
        var xhr = XmlHttpFactory.createXMLHTTPObject();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success(xhr);
                }
            }
        }
        xhr.send();
    }

    private loadGestures() {
        var url = "resources/gestures.json";
        this.downloadData(url, this.processGestures.bind(this));
    }

    private processGestures(xhr) {
        var fileData = JSON.parse(xhr.responseText);
        this.data = [];
        for (var i = 0; i < fileData.length; i++)
            this.data[i] = new Gesture(<string> fileData[i].name, <string[]> fileData[i].key, <number> fileData[i].factor);
    }

    public getGestureList(): utils.PairArray {
        return this.list;
    }

    public getGestureData(): Gesture[] {
        return this.data;
    }

    public getMouseupEvent() {
        return this.mouseupEvent;
    }
}