class PropertyManager {
    static getPropertyHtml(typeName: string, propertyKey: string, property: Property): string {
        switch (property.type) {
            case "string":
            case "combobox":
                return this.getHtmlForString(propertyKey, property);
            case "checkbox":
                return this.getHtmlForCheckBox(propertyKey, property);
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

    static getHtmlForCheckBox(propertyKey: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><div class="checkbox" data-type="' + propertyKey + '">';
        var state: string = "";
        if (property.value === "true") {
            state = "checked";
        }
        content += '<label class="active"><input type="checkbox" ' +
            state + ' >' + property.value + '</label>';
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForDropdown(typeName: string, propertyKey: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><select class="mydropdown" data-type="' + propertyKey + '">';
        var dropdownList = DropdownListManager.getDropdownList(typeName, property.name);
        for (var i in dropdownList) {
            var variant = dropdownList[i];
            var selected = "";
            if (variant === property.value) {
                selected = 'selected = "selected" ';
            }
            content += '<option ' + selected + 'value="' + variant + '">' + variant + '</option>';
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