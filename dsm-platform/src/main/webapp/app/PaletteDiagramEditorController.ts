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

/// <reference path="vendor.d.ts" />

class PaletteDiagramEditorController extends DiagramEditorController {

    private exporter: PaletteExporter;
    private parser: PaletteParser;

    constructor($scope, $attrs, $compile) {
        super($scope, $attrs);
        this.exporter = new PaletteExporter();
        this.parser = new PaletteParser(this);
        this.loadMetaEditor();
        $scope.loadMetaEditor = () => { this.loadMetaEditor(); };
        $scope.choosePalette = (paletteName: string) => { this.choosePalette(paletteName) };
        $scope.createPalette = () => { this.createPalette($scope, $compile); };
    }

    public loadMetaEditor() {
        this.elementsTypeLoader.load((elementTypes: ElementTypes): void => {
            this.handleLoadedTypes(elementTypes);
        });
    }

    public setNodeTypesMap(nodeTypes) {
        this.nodeTypesMap = nodeTypes;
    }

    public choosePalette(paletteName: string) {
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'getPalette',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({name: paletteName}),
            success: function (response): any {
                controller.changePalette(controller.parser.parse(response));
                controller.addLinks();
            },
            error: function (response, status, error): any {
                console.log("error: " + status + " " + error);
            }
        })
    }

    public createPalette($scope, $compile) {
        var name = $('#namePalette').val();
        var controller = this;
        var newPalette = '<li><a href="" role="menuitem" tabindex="-1" ng-click="choosePalette(' + "'" + name + "'" + ')">' + name + '</a></li>';
        $("#palettes").append($compile(newPalette) ($scope));
        var paletteJson = this.exporter.exportPaletteToJson(controller.getNodesMap(), controller.getLinksMap(), name);
        $.ajax({
            type: 'POST',
            url: 'createPalette',
            contentType: 'application/json',
            data: JSON.stringify(paletteJson),
            success: function (): any {
                controller.changePalette(controller.parser.parse(paletteJson));
                controller.addLinks();
                console.log('ok');
            },
            error: function (response, status, error): any {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private handleLoadedTypes(elementTypes: ElementTypes): void {
        this.propertyEditorController = new PropertyEditorController(this.paperController, this.undoRedoController);

        var categories: Map<Map<NodeType>> = elementTypes.paletteTypes.categories;
        for (var category in categories) {
            for (var typeName in categories[category]) {
                this.nodeTypesMap[typeName] = categories[category][typeName];
            }
        }

        this.addLinks();
        this.changePalette(elementTypes.paletteTypes);
    }

    private addLinks() {
        var properties: Map<Property> = {};
        properties["Guard"] = new Property("Guard", "combobox", "");
        var node: NodeType = new NodeType("Link", properties);
        this.nodeTypesMap["ControlFlow"] = node;
    }

    private changePalette(newPalette: PaletteTypes) {
        this.clearState();
        this.paletteController.clearBlocksPalette();
        this.paletteController.appendBlocksPalette(newPalette);
        this.paletteController.initDraggable();
    }

}