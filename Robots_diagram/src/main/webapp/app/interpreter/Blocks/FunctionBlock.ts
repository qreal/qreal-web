class FunctionBlock extends Block {
    static run(node, graph): string {
        var output = "Function: " + node.getName() + "\n";
        var properties = node.getProperties();
        var body = "";
        var initialization = true;
        for (var p in properties) {
            if (properties.hasOwnProperty(p)) {
                if (p == "Body") {
                    body = properties[p].value;

                    // evaluation of body


                }
                else if (p == "Initialization") {
                    initialization = properties[p].value;
                }
                else {
                    output += "Error, cannot get properties of " + node.getName() + "\n";
                }

            }
        }
        return output;
    }
}
