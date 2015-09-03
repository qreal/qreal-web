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
            url: 'getPalette/' + this.task,
            success: (response) => {
                this.handleResponse($.parseXML(response), $scope, $compile);
                this.controller.initPalette($scope);
            },
            error: function (response, status, error) {
                alert("Palette loading error: " + status + " " + error);
            }
        });
    }

    private handleResponse(xmlDoc: XMLDocument, $scope, $compile) {
        var notVisibleTypesMap: NodeTypesMap = this.parseNotVisibleTypes(
            <Element> xmlDoc.getElementsByTagName("NotVisible")[0]);
        var visibleTypesMap: NodeTypesMap = this.parseVisibleTypes(
            <Element> xmlDoc.getElementsByTagName("Visible")[0]);

        this.controller.setNodeTypesMap($.extend(notVisibleTypesMap, visibleTypesMap));
        this.appendHtmlContentToNavigation($scope, $compile);
    }

    private createNodeType(element: Element): NodeType {
        var name: string = element.getAttribute('name');
        var typeName: string = element.getAttribute('type');

        var elementTypeProperties: PropertiesMap = this.parseTypeProperties(typeName,
            element.getElementsByTagName("Property"));

        var imageElement = <Element> element.getElementsByTagName("Image")[0];

        if (imageElement) {
            var image: string = GeneralConstants.APP_ROOT_PATH + imageElement.getAttribute('src');
            return new NodeType(name, elementTypeProperties, image);
        } else {
            return new NodeType(name, elementTypeProperties);
        }
    }

    private parseTypeProperties(typeName: string, elementProperties: NodeList): PropertiesMap {
        var properties: PropertiesMap = {};
        for (var j = 0; j < elementProperties.length; j++) {
            var propertyElement: Element = <Element> elementProperties[j];
            var propertyKey: string = propertyElement.getAttribute('key');
            var propertyName: string = propertyElement.getAttribute('name');
            var propertyType: string = propertyElement.getAttribute('type');

            if (propertyType === "dropdown" || propertyType === "combobox") {
                var variants: Element = <Element> propertyElement.getElementsByTagName("Variants")[0];
                this.addDropdownList(typeName, propertyKey, variants.getElementsByTagName("variant"));
            }

            var propertyValue: string;
            var valueElement: Element = <Element> propertyElement.getElementsByTagName("value")[0];
            if (valueElement.hasAttribute("key")) {
                propertyValue = valueElement.getAttribute("key");
            } else {
                if (valueElement.childNodes[0]) {
                    propertyValue = valueElement.childNodes[0].nodeValue;
                } else {
                    propertyValue = '';
                }
            }

            var property:Property = new Property(propertyName, propertyValue, propertyType);
            properties[propertyKey] = property;
        }
        return properties;
    }

    private parseNotVisibleTypes(notVisibleTypesElement: Element): NodeTypesMap {
        var elements: NodeList = notVisibleTypesElement.getElementsByTagName("Element");
        var notVisibleTypesMap: NodeTypesMap = {};

        for (var i = 0; i < elements.length; i++) {
            var element: Element = <Element> elements[i];
            var typeName: string = element.getAttribute('type');

            notVisibleTypesMap[typeName] = this.createNodeType(element);
        }
        return notVisibleTypesMap;
    }

    private parseVisibleTypes(visibleTypesElement: Element): NodeTypesMap {
        return this.parsePaletteTypes(<Element> visibleTypesElement.getElementsByTagName("Palette")[0]);
    }

    private parsePaletteTypes(paletteTypesElement: Element): NodeTypesMap {
        var visibleNodeTypesMap: NodeTypesMap = {};

        var categories: NodeList = paletteTypesElement.getElementsByTagName("Category");
        for (var k = 0; k < categories.length; k++) {
            var category: Element = <Element> categories[k];
            this.paletteContent += '<li><p>' + category.getAttribute('name') + '</p><ul>';
            var elements: NodeList = category.getElementsByTagName("Element");

            for (var i = 0; i < elements.length; i++) {
                var element: Element = <Element> elements[i];
                var name: string = element.getAttribute('name');
                var typeName: string = element.getAttribute('type');

                this.paletteContent += '<li><div class="tree_element"' + 'data-type="' + typeName + '">';

                var imageElement = <Element> element.getElementsByTagName("Image")[0]
                var image: string = GeneralConstants.APP_ROOT_PATH + imageElement.getAttribute('src');

                visibleNodeTypesMap[typeName] = this.createNodeType(element);

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

    private addDropdownList(typeName: string, propertyKey: string, variantElements: NodeList): void {
        var variants: Variant[] = [];
        for (var i = 0; i < variantElements.length; i++) {
            var variant: Element = <Element> variantElements[i];
            variants.push(new Variant(variant.getAttribute("key"), variant.childNodes[0].nodeValue));
        }
        DropdownListManager.addDropdownList(typeName, propertyKey, variants);
    }

}