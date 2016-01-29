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

/// <reference path="PaperController.ts" />
/// <reference path="PropertyEditorController.ts" />
/// <reference path="loaders/ElementsTypeLoader.ts" />
/// <reference path="PaletteController.ts" />
/// <reference path="parsers/DiagramJsonParser.ts" />
/// <reference path="exporters/DiagramExporter.ts" />
/// <reference path="../model/DiagramEditor.ts" />
/// <reference path="../model/RobotsDiagramNode.ts" />
/// <reference path="../model/Map.ts"/>
/// <reference path="../../vendor.d.ts" />

class DiagramEditorController {

    private scope: ng.IScope;
    private diagramEditor: DiagramEditor;
    private paperController: PaperController;
    private propertyEditorController: PropertyEditorController;
    private elementsTypeLoader: ElementsTypeLoader;
    private paletteController: PaletteController;
    private diagramJsonParser: DiagramJsonParser;
    private diagramExporter: DiagramExporter;
    private robotsDiagramNode: RobotsDiagramNode;
    private nodeTypesMap: Map<NodeType> = {};
    private taskId: string;
    private kit: string;
    private isPaletteLoaded = false;

    constructor($scope, $attrs) {
        this.scope = $scope;
        this.taskId = $attrs.task;
        this.kit = $attrs.kit;
        this.diagramJsonParser = new DiagramJsonParser();
        this.diagramExporter = new DiagramExporter();
        this.paletteController = new PaletteController();
        DiagramElementListener.getNodeProperties = (type: string): Map<Property> => {
            return this.getNodeProperties(type);
        }
        this.diagramEditor = new DiagramEditor();
        this.paperController = new PaperController(this, this.diagramEditor.getPaper());
        this.elementsTypeLoader = new ElementsTypeLoader();
        this.elementsTypeLoader.load(this.kit, this.taskId, (elementTypes: ElementTypes): void => {
            this.handleLoadedTypes(elementTypes);
        });
        $scope.submit = (): void => {
            this.submit(this.scope);
        };
    }

    public handleLoadedTypes(elementTypes: ElementTypes): void {
        this.propertyEditorController = new PropertyEditorController(this.paperController);

        for (var typeName in elementTypes.uncategorisedTypes) {
            this.nodeTypesMap[typeName] = elementTypes.uncategorisedTypes[typeName];
        }

        var categories: Map<Map<NodeType>> = elementTypes.paletteTypes.categories;
        for (var category in categories) {
            for (var typeName in categories[category]) {
                this.nodeTypesMap[typeName] = categories[category][typeName];
            }
        }

        this.paletteController.appendBlocksPalette(elementTypes.paletteTypes);
        this.isPaletteLoaded = true;
        this.openDiagram(this.scope, this.kit, this.taskId);
    }

    public setNodeProperties(element: DiagramElement): void {
        this.propertyEditorController.setNodeProperties(element)
    }

    public clearNodeProperties(): void {
        this.propertyEditorController.clearState();
    }

    public getNodeType(type: string): NodeType {
        return this.nodeTypesMap[type];
    }

    public getNodeProperties(type: string): Map<Property> {
        return this.nodeTypesMap[type].getPropertiesMap();
    }

    public submit(scope: ng.IScope): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        $("#infoAlert").hide();
        var twoDModelSpinner = $('#twoDModelSpinner');
        twoDModelSpinner.show();
        var controller = this;
        var paper = controller.diagramEditor.getPaper();
        var diagramParts: DiagramParts = new DiagramParts(paper.getNodesMap(), paper.getLinksMap(),
            this.robotsDiagramNode);
        $.ajax({
            type: 'POST',
            url: 'submit/' + controller.taskId,
            dataType: 'json',
            timeout: 60000,
            data: {
                'kit': controller.kit,
                'diagram': JSON.stringify(controller.diagramExporter.exportDiagramStateToJSON(this.diagramEditor.getGraph(),
                    diagramParts))
            },
            success: function (response) {
                twoDModelSpinner.hide();
                scope.$emit("emitCheckingResult", response);
            },
            error: function (response, status, error) {
                twoDModelSpinner.hide();
                if (status == "timeout") {
                    alert("Timed out – please try again");
                } else {
                    alert(response.responseText);
                }
                console.log("error: " + status + " " + error);
            }
        });
    }

    public openDiagram(scope: ng.IScope, kit: string, taskId: string): void {
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
            timeout: 60000,
            data: {
                'kit': kit
            },
            success: function (response) {
                controller.clearState();
                diagramSpinner.hide();
                twoDModelSpinner.hide();
                scope.$emit("emit2dModelLoad", response.fieldXML);
                controller.handleLoadedDiagram(controller.diagramJsonParser.parse(response.diagram,
                    controller.nodeTypesMap));
            },
            error: function (response, status, error) {
                diagramSpinner.hide();
                twoDModelSpinner.hide();
                alert("error: " + status + " " + error);
                console.log("error: " + status + " " + error);
            }
        });
    }

    public handleLoadedDiagram(diagramParts: DiagramParts): void {
        this.robotsDiagramNode = diagramParts.robotsDiagramNode;
        if (diagramParts.subprogramDiagramNodes.length > 0) {
            this.paletteController.appendSubprogramsPalette(diagramParts.subprogramDiagramNodes, this.nodeTypesMap);
        }

        var paper = this.diagramEditor.getPaper();
        paper.addNodesFromMap(diagramParts.nodesMap);
        paper.addLinksFromMap(diagramParts.linksMap);
        this.paletteController.initDraggable();
    }

    private clearState(): void {
        this.diagramEditor.clear();
        this.propertyEditorController.clearState();
        this.paperController.clearState();
    }

}