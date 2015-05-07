class Factory {
    static run(node):string {
        var output = "";
        switch (node.type) {
            case "Initial Node":
                output += InitialBlock.run(node);
                break;

            case "Final Node":
                output += FinalBlock.run(node);
                break;

            case "Function":
                output += FunctionBlock.run(node);
                break;

            case "Smile":
                output += SmileBlock.run(node);
                break;
            
            default:
                output += "Not yet";
        }
        return output;
    }
}