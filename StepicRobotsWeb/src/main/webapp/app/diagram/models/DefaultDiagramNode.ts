/**
 * Created by vladzx on 10.10.14.
 */
class DefaultDiagramNode implements DiagramNode {

    private element: joint.shapes.devs.ImageWithPorts;
    private type: string;
    private text: string;
    private properties: PropertiesMap;
    private image: string;

    constructor(type: string, x: number, y: number, properties: PropertiesMap, image: string, id?: string) {
        this.text = 'Default';
        this.type = type;

        var elementAttributes = {
            position: { x: x, y: y },
            size: { width: 50, height: 50 },
            outPorts: [''],
            attrs: {
                image: {
                    'xlink:href': image
                }
            }
        }

        if (id) {
            jQuery.extend(elementAttributes, {id: id});
        }

        this.element = new joint.shapes.devs.ImageWithPorts(elementAttributes);
        this.properties = properties;
        this.image = image;
    }

    setText(text:string): void {
        this.text = text;
    }

    getType(): string {
        return this.type;
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