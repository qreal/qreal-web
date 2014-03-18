import Property = require("src/model/properties/Property");

class ContainerControl {

    private child: Property;
    constructor() {
    }

    public create(): JQuery {
        var container = $("<div></div>");
        return container;
    }
} 