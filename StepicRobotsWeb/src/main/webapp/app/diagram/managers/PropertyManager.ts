class PropertyManager {
    static getPropertyHtml(typeName: string, property: Property): string {
        switch (property.type) {
            case "string":
            case "combobox":
                return this.getHtmlForString(property);
            case "checkbox":
                return this.getHtmlForCheckBox(property);
            case "dropdown":
                return this.getHtmlForDropdown(typeName, property);
            case "spinner":
                return this.getHtmlForSpinner(property);
            default:
                return undefined;
        }
    }

    static getHtmlForString(property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><div class="input-group">';
        content += '<input type="text" class="form-control" value="' + property.value + '">';
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForCheckBox(property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><div class="checkbox">';
        var state: string = "";
        if (property.value === "true") {
            state = "checked";
        }
        content += '<label class="active"><input type="checkbox" ' + state + ' >' + property.value + '</label>'
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForDropdown(typeName: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><select class="mydropdown">';
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

    static getHtmlForSpinner(property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + property.name + '</td>';
        content += '<td class="vert-align"><input type="number" class="spinner" value="' + property.value +'">';
        content += '</td></tr>';
        return content;
    }
 }