class PropertyManager {
    static getPropertyHtml(name: string, property: Property): string {
        switch (property.type) {
            case "string":
                return this.getHtmlForString(name, property);
            case "checkbox":
                return this.getHtmlForCheckBox(name, property);
            case "dropdown":
                return this.getHtmlForString(name, property);
            case "spinner":
                return this.getHtmlForSpinner(name, property);
            default:
                return undefined;
        }
    }

    static getHtmlForString(name: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + name + '</td>';
        content += '<td class="vert-align"><div class="input-group">';
        content += '<input type="text" class="form-control" value="' + property.value + '">';
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForCheckBox(name: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + name + '</td>';
        content += '<td class="vert-align"><div class="checkbox">';
        var state: string = "";
        if (property.value === "True") {
            state = "checked";
        }
        content += '<label class="active"><input type="checkbox" ' + state + ' >' + property.value + '</label>'
        content += '</div></td></tr>';
        return content;
    }

    static getHtmlForSpinner(name: string, property: Property): string {
        var content: string = '<tr class="property">';
        content += '<td class="vert-align">' + name + '</td>';
        content += '<td class="vert-align"><input type="number" class="spinner" value="' + property.value +'">';
        return content;
    }
 }