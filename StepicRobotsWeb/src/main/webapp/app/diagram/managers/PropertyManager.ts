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

class PropertyManager {
    static getPropertyHtml(typeName: string, propertyKey: string, property: Property): string {
        switch (property.type) {
            case "string":
            case "combobox":
                return this.getHtmlForString(propertyKey, property);
            case "checkbox":
                return this.getHtmlForCheckBox(typeName, propertyKey, property);
            case "dropdown":
                return this.getHtmlForDropdown(typeName, propertyKey, property);
            case "spinner":
                return this.getHtmlForSpinner(propertyKey, property);
            default:
                return undefined;
        }
    }

    static getHtmlForString(propertyKey: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><div class="input-group">';
        content += '<input type="text" data-type="' + propertyKey +
            '"class="form-control" value="' + property.value + '">';
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForCheckBox(typeName: string, propertyKey: string, property: Property): string {
        var variantsList: Variant[] = VariantListManager.getVariantList(typeName, propertyKey);
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><div class="checkbox" data-type="' + propertyKey + '" ';
        var dataTrue: string;
        var dataFlase: string;

        for (var i = 0; i < variantsList.length; i++) {
            if (variantsList[i].getKey() === "true") {
                dataTrue = variantsList[i].getValue();
            }
            if (variantsList[i].getKey() === "false") {
                dataFlase = variantsList[i].getValue();
            }
        }

        content += 'data-true="' + dataTrue + '" data-false="' + dataFlase + '">';

        var visibleValue: string;
        if (property.value === variantsList[0].getKey()) {
            visibleValue = variantsList[0].getValue();
        } else {
            visibleValue = variantsList[1].getValue();
        }
        var state: string = "";
        if (property.value === "true") {
            state = "checked";
        }
        content += '<label class="active"><input type="checkbox" ' +
            state + ' >' + visibleValue + '</label>';
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForDropdown(typeName: string, propertyKey: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><select class="mydropdown" data-type="' + propertyKey + '">';
        var variantsList: Variant[] = VariantListManager.getVariantList(typeName, propertyKey);
        for (var i = 0; i < variantsList.length; i++) {
            var variant = variantsList[i];
            var selected = "";
            if (variant.getKey() === property.value) {
                selected = 'selected = "selected" ';
            }
            content += '<option ' + selected + 'value="' + variant.getKey() + '">' + variant.getValue() + '</option>';
        }
        content += '</select></td></tr>';
        return content;
    }

    static getHtmlForSpinner(propertyKey: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><input type="number" data-type="' + propertyKey +
            '"class="spinner" value="' + property.value +'">';
        content += '</td></tr>';
        return content;
    }
 }