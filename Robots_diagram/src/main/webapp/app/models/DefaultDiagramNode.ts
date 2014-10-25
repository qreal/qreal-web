/**
 * Created by vladzx on 10.10.14.
 */
class DefaultDiagramNode implements DiagramNode {
    element:joint.shapes.devs.RectWithPorts;
    text:string;
    properties: { [name: string]: string; };

    constructor(properties, image : string) {
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
    }

    setText(text:string) {
        this.text = text;
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