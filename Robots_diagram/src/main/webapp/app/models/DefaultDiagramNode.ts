/**
 * Created by vladzx on 10.10.14.
 */
class DefaultDiagramNode implements DiagramNode {
    id : string;
    element:joint.shapes.devs.RectWithPorts;
    text:string;
    properties: { [name: string]: string; };
    image : string;

    constructor(id : string, properties, image : string) {
        this.id = id;
        this.text = 'Default';
        this.element = new joint.shapes.devs.ImageWithPorts({
            position: { x: 100, y: 50 },
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

    setText(text:string) {
        this.text = text;
    }

    getId() {
        return this.id;
    }

    getImagePath() {
        return this.image;
    }

    getElement() {
        return this.element;
    }

    setProperty(name: string, value: string) {
        this.properties[name] = value;
    }

    getProperties() {
        return this.properties;
    }
}