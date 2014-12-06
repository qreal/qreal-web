/**
 * Created by vladzx on 10.10.14.
 */
class DefaultDiagramNode implements DiagramNode {
    name: string;
    element: joint.shapes.devs.ImageWithPorts;
    text: string;
    properties: PropertiesMap;
    image: string;

    constructor(name: string, x: number, y: number, properties: PropertiesMap, image: string) {
        this.name = name;
        this.text = 'Default';

        this.element = new joint.shapes.devs.ImageWithPorts({
            position: { x: x, y: y },
            size: { width: 50, height: 50 },
            outPorts: [''],
            attrs: {
                image: {
                    'xlink:href': image
                }
            }
        });
        this.properties = properties;
        this.image = image;
    }

    setText(text:string): void {
        this.text = text;
    }

    getName(): string {
        return this.name;
    }

    getX(): number {
        return (this.element.get("position"))['x'];
    }

    getY(): number {
        return (this.element.get("position"))['y'];
    }

    getImagePath(): string {
        return this.image;
    }

    getElement() {
        return this.element;
    }

    setProperty(name:string, property: Property): void {
        this.properties[name] = property;
    }

    getProperties(): PropertiesMap {
        return this.properties;
    }
}