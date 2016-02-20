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

    constructor(diagramEditorController: DiagramEditorController, paper: DiagramPaper) {
        this.diagramEditorController = diagramEditorController;
        this.paper = paper;
        this.paper.on('cell:pointerdown', (cellView, event, x, y): void => {
            this.cellPointerdownListener(cellView, event, x, y);
        });
        this.paper.on('blank:pointerdown', (event, x, y): void => {
            this.blankPoinerdownListener(event, x, y);
        });
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

    private blankPoinerdownListener(event, x, y): void {
        if (!($(event.target).parents(".custom-menu").length > 0)) {
            $(".custom-menu").hide(100);
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

        var node: DiagramNode = this.paper.getNodeById(cellView.model.id);
        if (node) {
            this.setCurrentElement(node);
            this.diagramEditorController.setNodeProperties(node);
        } else {
            var link: Link = this.paper.getLinkById(cellView.model.id);
            if (link) {
                this.setCurrentElement(link);
                this.diagramEditorController.setNodeProperties(link);
            } else {
                this.clearCurrentElement();
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