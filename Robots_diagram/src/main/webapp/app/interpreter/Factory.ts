class Factory {
    static run(node, graph, nodesList, env): string {
        var output = "";
        switch (node.type) {
            case "Initial Node":
                output += InitialBlock.run(node, graph, nodesList, env);
                break;

            case "Final Node":
                output += FinalBlock.run(node, graph);
                break;

            case "Condition":
                output += IfBlock.run(node, graph, nodesList, env);
                break;

            case "Function":
                output += FunctionBlock.run(node, graph, nodesList, env);
                break;

            case "Motors Forward":
                output += Motors.run(node, graph, nodesList, true, env);
                break;

            case "Motors Backward":
                output += Motors.run(node, graph, nodesList, false, env);
                break;

            case "Stop Motors":
                output += MotorsStop.run(node, graph, nodesList, env);
                break;

            default:
                output += "Not yet";
        }
        return output;
    }
}