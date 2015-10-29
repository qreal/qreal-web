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

class ElementsTypeLoader {

    private controller: DiagramController;
    private task: string;
    private paletteContent: string;

    constructor(controller: DiagramController, task: string) {
        this.controller = controller;
        this.task = task;
        this.paletteContent = '';
    }

    loadFromXml($scope, $compile): void {
        $.ajax({
            type: 'POST',
            url: 'getTypes/' + this.task,
            success: (response) => {
                this.handleResponse(response, $scope, $compile);
                this.controller.initPalette($scope);
            },
            error: function (response, status, error) {
                alert("Palette loading error: " + status + " " + error);
            }
        });
    }

    private handleResponse(response: any, $scope, $compile) {
        var notVisibleTypesMap: NodeTypesMap = this.parseNotVisibleTypes(response.notVisible);
        var visibleTypesMap: NodeTypesMap = this.parseVisibleTypes(response.visible);

        this.controller.setNodeTypesMap($.extend(notVisibleTypesMap, visibleTypesMap));
        this.appendHtmlContentToNavigation($scope, $compile);
    }

    private parseNotVisibleTypes(notVisibleTypes: any): NodeTypesMap {
        var notVisibleTypesMap: NodeTypesMap = {};

        for (var i in notVisibleTypes) {
            var typeObject = notVisibleTypes[i];
            var typeName: string = typeObject.type;

            notVisibleTypesMap[typeName] = this.createNodeType(typeObject);
        }
        return notVisibleTypesMap;
    }

    private parseVisibleTypes(visibleTypes: any): NodeTypesMap {
        return this.parsePaletteTypes(visibleTypes.palette);
    }

    private parsePaletteTypes(paletteTypes: any): NodeTypesMap {
        var visibleNodeTypesMap: NodeTypesMap = {};

        for (var category in paletteTypes) {
            this.paletteContent += '<li><p>' + category + '</p><ul>';

            for (var i in paletteTypes[category]) {
                var typeObject = paletteTypes[category][i];
                var name: string = typeObject.name;
                var typeName: string = typeObject.type;

                this.paletteContent += '<li><div class="tree_element"' + 'data-type="' + typeName + '">';

                var imageElement: any = typeObject.image;

                var image: string = GeneralConstants.APP_ROOT_PATH + imageElement.src;

                visibleNodeTypesMap[typeName] = this.createNodeType(typeObject);

                this.paletteContent += '<img class="elementImg" src="' +
                    image + '" width="30" height="30"' + '/>';
                this.paletteContent += name;
                this.paletteContent += '</div></li>';
            }

            this.paletteContent += '</ul></li>';
        }

        return visibleNodeTypesMap;
    }

    private appendHtmlContentToNavigation($scope, $compile): void {
        $('#navigation').append($compile(this.paletteContent)($scope));

        $("#navigation").treeview({
            persist: "location"
        });
    }

    private createNodeType(typeObject: any): NodeType {
        var name: string = typeObject.name;
        var typeName: string = typeObject.type;

        var elementTypeProperties: PropertiesMap = this.parseTypeProperties(typeName, typeObject.properties);

        var imageElement: any = typeObject.image;

        if (imageElement) {
            var image: string = GeneralConstants.APP_ROOT_PATH + imageElement.src;
            return new NodeType(name, elementTypeProperties, image);
        } else {
            return new NodeType(name, elementTypeProperties);
        }
    }

    private parseTypeProperties(typeName: string, propertiesArrayNode: any): PropertiesMap {
        var properties: PropertiesMap = {};
        for (var i in propertiesArrayNode) {
            var propertyObject = propertiesArrayNode[i];
            var propertyKey: string = propertyObject.key;
            var propertyName: string = propertyObject.name;
            var propertyType: string = propertyObject.type;

            if (propertyType === "dropdown" || propertyType === "combobox" || propertyType === "checkbox") {
                this.addVariantList(typeName, propertyKey, propertyObject.variants);
            }

            var propertyValue: string = "";
            if (propertyObject.value) {
                propertyValue = propertyObject.value;
            } else if (propertyObject.selected) {
                propertyValue = propertyObject.selected.key;
            }

            var property: Property = new Property(propertyName, propertyValue, propertyType);
            properties[propertyKey] = property;
        }
        return properties;
    }

    private addVariantList(typeName: string, propertyKey: string, variantsArrayNode: any): void {
        var variants: Variant[] = [];
        for (var i in variantsArrayNode) {
            var variant = variantsArrayNode[i];
            variants.push(new Variant(variant.key, variant.value));
        }
        VariantListManager.addVariantList(typeName, propertyKey, variants);
    }

}