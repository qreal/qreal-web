class FunctionBlock {
    static run(node): string {
        var name = "Function: " + node.getName();
        var properties = node.getProperties();
        var body = "";
        var initialization = true;
        for (var p in properties) {
            if (properties.hasOwnProperty(p)) {
                if (properties[p].type == "string") {
                    body = properties[p].value;
                }
                else if (properties[p].type == "bool") {
                    initialization = properties[p].value;
                }
                else {
                    name += "Error, cannot get properties of" + node.getName();
                }

            }
        }
        return name;
    }
}
