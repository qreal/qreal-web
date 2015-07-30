class Block {

    run(): void {
    }

    static error(timeline : Timeline, message : string): void {
        InterpretManager.error = true;
        timeline.stop();
        alert(message);
    }

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
