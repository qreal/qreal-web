class RobotsDiagramNode {
    private logicalId: string;
    private graphicalId: string;
    private properties: PropertiesMap;
    private type: string = "RobotsDiagramNode";

    constructor(logicalId: string, graphicalId: string, properties: PropertiesMap) {
        this.logicalId = logicalId;
        this.graphicalId = graphicalId;
        this.properties = properties;
    }

    getLogicalId(): string {
        return this.logicalId;
    }

    getGraphicalId(): string {
        return this.graphicalId;
    }

    getProperties(): PropertiesMap {
        return this.properties;
    }

    getType(): string {
        return this.type;
    }
}