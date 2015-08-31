class Link implements DiagramElement {
    private logicalId: string;
    private jointObject: joint.dia.Link;
    private properties: PropertiesMap = {};
    private name = "Link"
    private type = "ControlFlow";

    constructor(jointObject: joint.dia.Link, properties?: PropertiesMap) {
        this.logicalId = UIDGenerator.generate();
        this.jointObject = jointObject;

        jointObject.on('change:source', () => {
                this.updateHighlight();
            }
        );

        jointObject.on('change:target', () => {
                this.updateHighlight();
            }
        );

        if (properties) {
            this.properties = properties;
        }
        else {
            this.properties["Guard"] = new Property("Guard", "", "combobox");
        }
    }

    getLogicalId(): string {
        return this.logicalId;
    }

    getJointObject() {
        return this.jointObject;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getProperties(): PropertiesMap {
        return this.properties;
    }

    setProperty(key: string, property: Property): void {
        this.properties[key] = property;
    }

    private updateHighlight(): void {
        if (!this.jointObject.get('target').id || !this.jointObject.get('source').id) {
            this.jointObject.attr({
                    '.connection': {stroke: 'red'},
                    '.marker-target': {fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z'}
                }
            );
        } else {
            this.jointObject.attr({
                    '.connection': {stroke: 'black'},
                    '.marker-target': {fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z'}
                }
            );
        }
    }
}