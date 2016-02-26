/*
 * Copyright Vladimir Zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference path="DiagramEditorController.ts" />
/// <reference path="../model/DiagramPaper.ts" />
/// <reference path="../model/DiagramElement.ts" />
/// <reference path="../model/PaletteTypes.ts" />
/// <reference path="../model/DiagramNode.ts" />
/// <reference path="../model/DefaultDiagramNode.ts" />
/// <reference path="../../vendor.d.ts" />

class PaperController {

    private diagramEditorController: DiagramEditorController;
    private paper: DiagramPaper;
    private currentElement: DiagramElement;
    private clickFlag : boolean;
    private rightClickFlag : boolean;
    private gesturesController: GesturesController;

    constructor(diagramEditorController: DiagramEditorController, paper: DiagramPaper) {
        this.diagramEditorController = diagramEditorController;
        this.paper = paper;
        this.clickFlag = false;
        this.rightClickFlag = false;
        this.gesturesController = new GesturesController(this);

        this.paper.on('cell:pointerdown', (cellView, event, x, y): void => {
            this.cellPointerdownListener(cellView, event, x, y);
        });
        this.paper.on('blank:pointerdown', (event, x, y): void => {
            this.blankPoinerdownListener(event, x, y);
        });

        this.paper.on('cell:pointerup', (cellView, event, x, y): void => {
            this.cellPointerupListener(cellView, event, x, y);
        });
        this.paper.on('cell:pointermove', (cellView, event, x, y): void => {
            this.cellPointermoveListener(cellView, event, x, y);
        });

        this.diagramEditorController.getGraph().on('change:position', (cell) => {
            if (!this.rightClickFlag) {
                return;
            }
            cell.set('position', cell.previous('position'));
        });

        document.addEventListener('mouseup', (event) => { this.gesturesController.onMouseUp(event) } );
        $("#diagram_paper").mousemove((event) => { this.gesturesController.onMouseMove(event) } );

        this.initDropPaletteElementListener();

        this.initDeleteListener();
        this.initCustomContextMenu();
    }

    public getCurrentElement(): DiagramElement {
        return this.currentElement;
    }

    public clearState(): void {
        this.clearCurrentElement();
    }

    public createNodeInEventPositionFromNames(names: string[], event): void {
        var offsetX = (event.pageX - $("#diagram_paper").offset().left + $("#diagram_paper").scrollLeft()) /
            this.paper.getZoom();
        var offsetY = (event.pageY - $("#diagram_paper").offset().top + $("#diagram_paper").scrollTop()) /
            this.paper.getZoom();
        var gridSize: number = this.paper.getGridSize();
        offsetX -= offsetX % gridSize;
        offsetY -= offsetY % gridSize;

        var filteredNames: string[] = names.filter((type: string) => {
            return this.diagramEditorController.getNodeType(type) !== undefined;
        });

        if (filteredNames.length === 0) {
            return;
        }
        if (filteredNames.length === 1) {
            this.createNode(filteredNames[0], offsetX, offsetY);
            return;
        }

        var items = [];
        for (var i = 0; i < filteredNames.length; ++i) {
            items.push(
                {
                    "name": filteredNames[i],
                    "action": ((type, offsetX, offsetY) => { this.createNode(type, offsetX, offsetY);})
                        .bind(this, filteredNames[i], offsetX, offsetY)
                });
        }

        var contextMenu = new ContextMenu();
        var menuDiv = document.createElement("div");
        menuDiv.className = "gestures-menu";
        menuDiv.style.left = event.x + "px";
        menuDiv.style.top = event.y + "px";
        document.body.appendChild(menuDiv);
        contextMenu.showMenu(new CustomEvent("context-menu"), menuDiv, items);
    }

    public createLinkBetweenCurrentAndEventTargetElements(event): void {
        var diagramPaper: HTMLDivElement = <HTMLDivElement> document.getElementById('diagram_paper');

        var elementBelow = this.diagramEditorController.getGraph().get('cells').find((cell) => {
            if (cell instanceof joint.dia.Link) return false; // Not interested in links.
            if (cell.id === this.currentElement.getJointObject().id) return false; // The same element as the dropped one.
            var mXBegin = cell.getBBox().origin().x;
            var mYBegin = cell.getBBox().origin().y;
            var mXEnd = cell.getBBox().corner().x;
            var mYEnd = cell.getBBox().corner().y;

            var leftElementPos:number = (event.pageX - $(diagramPaper).offset().left + $(diagramPaper).scrollLeft()) /
                this.paper.getZoom();
            var topElementPos:number = (event.pageY - $(diagramPaper).offset().top + $(diagramPaper).scrollTop()) /
                this.paper.getZoom();

            if ((mXBegin <= leftElementPos) && (mXEnd >= leftElementPos)
                && (mYBegin <= topElementPos) && (mYEnd >= topElementPos) && (this.rightClickFlag))
                return true;
            return false;
        });

        if (elementBelow) {
            this.createLink(this.currentElement.getJointObject().id, elementBelow.id);
        }
    }

    private blankPoinerdownListener(event, x, y): void {
        if (!($(event.target).parents(".custom-menu").length > 0)) {
            $(".custom-menu").hide(100);
        }

        if (event.button == 2) {
            this.gesturesController.startDrawing();
        }

        this.diagramEditorController.clearNodeProperties();
        if (this.currentElement) {
            this.clearCurrentElement();
        }
    }

    private cellPointerdownListener(cellView, event, x, y): void {
        if (!($(event.target).parents(".custom-menu").length > 0)) {
            $(".custom-menu").hide(100);
        }

        this.clickFlag = true;
        this.rightClickFlag = false;

        var node: DiagramNode = this.paper.getNodeById(cellView.model.id);
        if (node) {
            this.setCurrentElement(node);
            this.diagramEditorController.setNodeProperties(node);

            if (event.button == 2) {
                this.rightClickFlag = true;
                this.gesturesController.startDrawing();
            }
        } else {
            var link: Link = this.paper.getLinkById(cellView.model.id);
            if (link) {
                this.setCurrentElement(link);
                this.diagramEditorController.setNodeProperties(link);
            } else {
                this.clearCurrentElement();
            }
        }
    }

    private cellPointerupListener(cellView, event, x, y): void {
        if (!($(event.target).parents(".custom-menu").length > 0)) {
            $(".custom-menu").hide(100);
        }
        if ((this.clickFlag) && (event.button == 2)) {
            $(".custom-menu").finish().toggle(100).
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        }
    }

    private cellPointermoveListener(cellView, event, x, y): void {
        this.clickFlag = false;
    }

    private initDropPaletteElementListener(): void {
        var controller: PaperController = this;
        var paper: DiagramPaper = this.paper;

        $("#diagram_paper").droppable({
            drop: function(event, ui) {
                var topElementPos: number = (ui.offset.top - $(this).offset().top + $(this).scrollTop()) /
                    paper.getZoom();
                var leftElementPos: number = (ui.offset.left - $(this).offset().left + $(this).scrollLeft()) /
                    paper.getZoom();
                var gridSize: number = paper.getGridSize();
                topElementPos -= topElementPos % gridSize;
                leftElementPos -= leftElementPos % gridSize;

                var type = $(ui.draggable.context).data("type");
                var image: string = controller.diagramEditorController.getNodeType(type).getImage();
                var name: string = controller.diagramEditorController.getNodeType(type).getName();

                var typeProperties: Map<Property> = controller.diagramEditorController.getNodeType(type).getPropertiesMap();

                var nodeProperties: Map<Property> = {};
                for (var property in typeProperties) {
                    nodeProperties[property] = new Property(typeProperties[property].name, typeProperties[property].type,
                        typeProperties[property].value);
                }

                var node: DiagramNode;
                var dataId = $(ui.draggable.context).data("id");
                if (dataId) {
                    name = $(ui.draggable.context).data("name");
                    node = paper.createSubprogramNode(name, type, leftElementPos, topElementPos,
                        nodeProperties, image, dataId);
                } else {
                    node = paper.createDefaultNode(name, type, leftElementPos, topElementPos,
                        nodeProperties, image);
                }

                controller.setCurrentElement(node);
                controller.diagramEditorController.setNodeProperties(node);
            }
        });
    }

    public createLink(sourceId: string, targetId: string): void {
        var link: joint.dia.Link = new joint.dia.Link({
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: sourceId },
            target: { id: targetId },
        });

        var typeProperties = this.diagramEditorController.getNodeProperties("ControlFlow");

        var linkProperties: Map<Property> = {};
        for (var property in typeProperties) {
            linkProperties[property] = new Property(typeProperties[property].name,
                typeProperties[property].type, typeProperties[property].value);
        }

        var linkObject: Link = new Link(link, linkProperties);
        this.paper.addLinkToPaper(linkObject);
    }

    public createNode(type: string, x: number, y: number): void {
        var controller: PaperController = this;
        var image: string = controller.diagramEditorController.getNodeType(type).getImage();
        var name: string = controller.diagramEditorController.getNodeType(type).getName();

        var typeProperties: Map<Property> = controller.diagramEditorController.getNodeType(type).getPropertiesMap();

        var nodeProperties: Map<Property> = {};
        for (var property in typeProperties) {
            nodeProperties[property] = new Property(typeProperties[property].name, typeProperties[property].type,
                typeProperties[property].value);
        }

        var node: DiagramNode = this.paper.createDefaultNode(name, type, x, y, nodeProperties, image);
        controller.setCurrentElement(node);
        controller.diagramEditorController.setNodeProperties(node);
    }

    private setCurrentElement(element): void {
        if (this.currentElement) {
            this.unselectElement(this.currentElement.getJointObject());
        }
        this.currentElement = element;
        this.selectElement(this.currentElement.getJointObject());
    }

    private selectElement(jointObject): void {
        var jQueryEl = this.paper.findViewByModel(jointObject).$el;
        var oldClasses = jQueryEl.attr('class');
        jQueryEl.attr('class', oldClasses + ' selected');
    }

    private unselectElement(jointObject): void {
        var jQueryEl = this.paper.findViewByModel(jointObject).$el;
        var removedClass = jQueryEl.attr('class').replace(new RegExp('(\\s|^)selected(\\s|$)', 'g'), '$2');
        jQueryEl.attr('class', removedClass);
    }

    private clearCurrentElement(): void {
        if (this.currentElement) {
            this.unselectElement(this.currentElement.getJointObject());
            this.currentElement = undefined;
        }
    }

    private initCustomContextMenu(): void {
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

    private initDeleteListener(): void {
        var deleteKey: number = 46;
        $('html').keyup((event) => {
            if(event.keyCode == deleteKey) {
                if(!(document.activeElement.tagName === "INPUT")) {
                    this.removeCurrentElement();
                }
            }
        });
    }

    private removeCurrentElement(): void {
        if (this.currentElement) {
            if (this.currentElement instanceof DefaultDiagramNode) {
                this.paper.removeNode(this.currentElement.getJointObject().id);
            } else {
                this.paper.removeLink(this.currentElement.getJointObject().id);
            }
            this.diagramEditorController.clearNodeProperties();
            this.currentElement = undefined;
        }
    }

}