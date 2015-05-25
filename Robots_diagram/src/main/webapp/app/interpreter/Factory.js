var Factory = (function () {
    function Factory() {
    }
    Factory.run = function (node, graph, nodesList) {
        var output = "";
        switch (node.type) {
            case "Initial Node":
                output += InitialBlock.run(node, graph, nodesList);
                break;
            case "Final Node":
                output += FinalBlock.run(node, graph);
                break;
            case "Condition":
                output += IfBlock.run(node, graph, nodesList);
                break;
            case "Motors Forward":
                output += Motors.run(node, graph, nodesList, true);
                break;
            case "Motors Backward":
                output += Motors.run(node, graph, nodesList, false);
                break;
            case "Stop Motors":
                output += MotorsStop.run(node, graph, nodesList);
                break;
            default:
                output += "Not yet";
        }
        return output;
    };
    return Factory;
})();
//# sourceMappingURL=Factory.js.map