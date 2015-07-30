class Block {

    run(): void {
    }

    /**
     * Stops the robot's movement and reports an error
     * @param timeline
     * @param message
     */
    static error(timeline : Timeline, message : string): void {
        InterpretManager.error = true;
        timeline.stop();
        alert(message);
    }

    /**
     * Gets guard from a link
     * @param link
     * @returns {string}
     */
    static getGuard(link : Link) {
        var guard = "";
        var properties = link.getProperties();
        for (var p in properties) {
            if (p == "Guard") {
                guard = properties[p].value;
            }
        }
        return guard;
    }

    /**
     * Gets condition from a node
     * @param node
     * @returns {string}
     */
    static getCondition(node : DefaultDiagramNode) {
        var condition = "";
        var properties = node.getProperties();
        for (var p in properties) {
            if (p == "Condition") {
                condition = properties[p].value;
            }
        }
        return condition;
    }
}
