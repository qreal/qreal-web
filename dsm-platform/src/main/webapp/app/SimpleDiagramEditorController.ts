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

class SimpleDiagramEditorController extends DiagramEditorController {

    private exporter: PaletteExporter;

    constructor($scope, $attrs) {
        super($scope, $attrs);
        this.exporter = new PaletteExporter();
        this.choosePalette("metaEditor.json");
        $scope.choosePalette = (typeList: string) => { this.choosePalette(typeList); };
        $scope.createPalette = () => { this.createPalette(); }
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

        this.paletteController.clearBlocksPalette();
        this.paletteController.appendBlocksPalette(elementTypes.paletteTypes);
        this.paletteController.initDraggable();
    }

    public choosePalette(typesList: string) {
        this.elementsTypeLoader.load((elementTypes: ElementTypes): void => {
            this.handleLoadedTypes(elementTypes);
        }, typesList);
    }

    public createPalette() {
        var name = $('#namePalette').val();
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'createPalette',
            contentType: 'application/json',
            data: JSON.stringify(controller.exporter.exportPaletteToJson(controller.getNodesMap(), name)),
            success: function (response): any {
                console.log('ok');
            },
            error: function (response, status, error): any {
                console.log("error: " + status + " " + error);
            }
        });

        var newPalette = new PaletteTypes();
        var basePalette: Map<NodeType> = {};

        for (var id in this.getNodesMap()) {
            var nodeName = this.getNodesMap()[id].getChangeableProperties()["name"].value;
            var nodeImage = this.getNodesMap()[id].getChangeableProperties()["image"].value;
            var node = new NodeType(nodeName, {}, nodeImage);
            basePalette[nodeName] = node;
            this.nodeTypesMap[nodeName] = node;
        }

        newPalette.categories[name] = basePalette;

        this.clearState();
        this.paletteController.clearBlocksPalette();
        this.paletteController.appendBlocksPalette(newPalette);
        this.paletteController.initDraggable();
    }
}