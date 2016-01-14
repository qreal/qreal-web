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

class PropertyEditorController {

    private propertyViewFactory: PropertyViewFactory;
    private paperController: PaperController;

    constructor(paperController: PaperController) {
        this.propertyViewFactory = new PropertyViewFactory();
        this.paperController = paperController;
        this.initInputStringListener();
        this.initCheckboxListener();
        this.initDropdownListener();
        this.initSpinnerListener();
    }

    public setNodeProperties(element: DiagramElement): void {
        $('#property_table tbody').empty();
        var properties: Map<Property> = element.getChangeableProperties();
        for (var property in properties) {
            var propertyView: HtmlView = this.propertyViewFactory.createView(element.getType(),
                property, properties[property]);
            var htmlElement = $(propertyView.getContent());
            $('#property_table tbody').append(htmlElement);

            if (properties[property].type === "combobox") {
                this.initCombobox(element.getType(), property, htmlElement);
            }
        }
    }

    public clearState(): void {
        $(".property").remove();
    }

    private initCombobox(typeName: string, propertyKey: string, element) {
        var variantsList = VariantListMapper.getVariantList(typeName, propertyKey);
        var controller: PropertyEditorController = this;

        element.find('input').autocomplete({
            source: variantsList,
            minLength: 0,
            select: function (event, ui) {
                var currentElement: DiagramElement = controller.paperController.getCurrentElement();
                var key = $(this).data('type');
                var value = ui.item.value;
                var property: Property = currentElement.getChangeableProperties()[key];
                property.value = value;
                currentElement.setProperty(key, property);
            }
        }).focus(function() {
            $(this).autocomplete("search", $(this).val());
        });
    }

    private initInputStringListener(): void {
        var controller: PropertyEditorController = this;
        $(document).on('input', '.form-control', function () {
            var currentElement: DiagramElement = controller.paperController.getCurrentElement();
            var key = $(this).data('type');
            var value = $(this).val();
            var property: Property = currentElement.getChangeableProperties()[key];
            property.value = value;
            currentElement.setProperty(key, property);
        });
    }

    private initCheckboxListener(): void {
        var controller: PropertyEditorController = this;
        $(document).on('change', '.checkbox', function () {
            var currentElement: DiagramElement = controller.paperController.getCurrentElement();
            var key = $(this).data('type');
            var property: Property = currentElement.getChangeableProperties()[key];
            var currentValue = property.value;

            var tr = $(this).closest('tr');
            var label = tr.find('label');
            if (currentValue === "true") {
                currentValue = "false"
                label.contents().last()[0].textContent = $(this).data("false");
            } else {
                currentValue = "true"
                label.contents().last()[0].textContent =  $(this).data("true");
            }
            property.value = currentValue;
            currentElement.setProperty(key, property);
        });
    }

    private initDropdownListener(): void {
        var controller: PropertyEditorController = this;
        $(document).on('change', '.mydropdown', function () {
            var currentElement: DiagramElement = controller.paperController.getCurrentElement();
            var key = $(this).data('type');
            var value = $(this).val();
            var property: Property = currentElement.getChangeableProperties()[key];
            property.value = value;
            currentElement.setProperty(key, property);
        });
    }

    private initSpinnerListener(): void {
        var controller: PropertyEditorController = this;
        $(document).on('change', '.spinner', function () {
            var currentElement: DiagramElement = controller.paperController.getCurrentElement();
            var key = $(this).data('type');
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property: Property = currentElement.getChangeableProperties()[key];
                property.value = value;
                currentElement.setProperty(key, property);
            }
        });
    }
}