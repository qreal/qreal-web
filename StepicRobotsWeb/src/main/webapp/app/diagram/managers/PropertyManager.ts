class PropertyManager {
    static getPropertyHtml(typeName: string, propertyName: string, property: Property): string {
        switch (property.type) {
            case "string":
                return this.getHtmlForString(propertyName, property);
            case "checkbox":
                return this.getHtmlForCheckBox(propertyName, property);
            case "dropdown":
                return this.getHtmlForDropdown(typeName, propertyName, property);
            case "spinner":
                return this.getHtmlForSpinner(propertyName, property);
            default:
                return undefined;
        }
    }

    static getHtmlForString(propertyName: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><div class="input-group">';
        content += '<input type="text" class="form-control" value="' + property.value + '">';
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForCheckBox(propertyName: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><div class="checkbox">';
        var state: string = "";
        if (property.value === "True") {
            state = "checked";
        }
        content += '<label class="active"><input type="checkbox" ' + state + ' >' + property.value + '</label>'
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForDropdown(typeName: string, propertyName: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><select class="mydropdown">';
        var dropdownList = DropdownListManager.getDropdownList(typeName, propertyName);
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

    static getHtmlForSpinner(propertyName: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + propertyName + '</td>';
        content += '<td class="vert-align"><input type="number" class="spinner" value="' + property.value +'">';
        content += '</td></tr>';
        return content;
    }
 }