class Motors extends Block {
    static run(node, graph, nodesMap, linksMap, forward, env, timeline): string {
        var output = "Motors forward/backward" + "\n";
        var ports = [];
        var power = 0;
        var nodeId = InterpretManager.getIdByNode(node, nodesMap);
        var links = InterpretManager.getOutboundLinks(graph, nodeId);

        // Figuring out port names
        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Ports") {
                ports = properties[p].value.replace(/ /g,'').split(",");
            }
            if (p == "Power (%)") {
                var parser = new Parser(properties[p].value, env);
                parser.parseExpression();

                if (parser.error == null) {
                    power = parser.result;

                    if (power < 0 || power > 100) {
                        Block.error(timeline, "Error: incorrect power value in Motors Forward(Backward) block (must be between 0 and 100)");
                    }
                    else {
                        output += "Ports: " + ports + "\n" + "Power: " + power + "\n";
                    }
                }
                else {
                    Block.error(timeline, "Parser error in Motors Forward(Backward) block" + parser.error + "\n");
                }
            }
        }

        // Setting chosen motors' power
        if (!InterpretManager.error) {
            var models = timeline.getRobotModels();
            var model = models[0];
            power = (forward) ? power : -power; // Divide forward and backward directions

            if (ports.length == 1) {
                if (ports[0] == "M3") {
                    model.setMotor1(power);
                }
                else if (ports[0] == "M4") {
                    model.setMotor2(power);
                }
                else {
                    Block.error(timeline, "Error: Incorrect port name in Motors Forward(Backward) block");
                }
            }
            else if (ports.length == 2) {
                if (ports[0] == "M3" && ports[1] == "M4" || ports[0] == "M4" && ports[1] == "M3") {
                    model.setMotor1(power);
                    model.setMotor2(power);
                }
                else {
                    Block.error(timeline, "Error: Incorrect port names in Motors Forward(Backward) block");
                }
            }
            else {
                Block.error(timeline, "Error: Incorrect number of ports in Motors Forward(Backward) block (may be 2 or 1 divided by commas)");
            }

            // Figuring out the next node
            if (links.length == 1) {
                var nextNode = nodesMap[links[0].get('target').id];
                output += Factory.run(nextNode, graph, nodesMap, linksMap, env, timeline);
            }
            else if (links.length > 1) {
                Block.error(timeline, "Error: too many links from Motors Forward(Backwards) block");
            }
            else {
                Block.error(timeline, "Error: cannot find next node after Motors Forward(Backwards)");
            }
        }

        return output;
    }
}