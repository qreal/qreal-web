interface DiagramElement {
    getLogicalId(): string;
    getJointObject();
    getName(): string;
    getType(): string;
    getProperties(): PropertiesMap;
    setProperty(name: string, property: Property): void;
}