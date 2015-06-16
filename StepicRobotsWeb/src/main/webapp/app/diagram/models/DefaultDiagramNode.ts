/**
 * Created by vladzx on 10.10.14.
 */
class DefaultDiagramNode implements DiagramNode {
    private logicalId: string;
    private jointObject: joint.shapes.devs.ImageWithPorts;
    private name: string;
    private type: string;
    private properties: PropertiesMap;
    private imagePath: string;

    constructor(name: string, type: string, x: number, y: number, properties: PropertiesMap, imagePath: string, id?: string) {
        this.logicalId = UIDGenerator.generate();
        this.name = name;
        this.type = type;

        var jointObjectAttributes = {
            position: { x: x, y: y },
            size: { width: 50, height: 50 },
            outPorts: [''],
            attrs: {
                image: {
                    'xlink:href': imagePath
                }
            }
        }

        if (id) {
            jQuery.extend(jointObjectAttributes, {id: id});
        }

        this.jointObject = new joint.shapes.devs.ImageWithPorts(jointObjectAttributes);
        this.properties = properties;
        this.imagePath = imagePath;
    }

    getLogicalId(): string {
        return this.logicalId;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getX(): number {
        return (this.jointObject.get("position"))['x'];
    }

    getY(): number {
        return (this.jointObject.get("position"))['y'];
    }

    getImagePath(): string {
        return this.imagePath;
    }

    getJointObject() {
        return this.jointObject;
    }

    setProperty(key: string, property: Property): void {
        this.properties[key] = property;
    }

    getProperties(): PropertiesMap {
        return this.properties;
    }
}