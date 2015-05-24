interface DiagramElement {
    getLogicalId(): string;
    getJointObject();
    getType(): string;
    getProperties(): PropertiesMap;
    setProperty(name: string, property: Property): void;
}