/**
 * Created by vladzx on 10.10.14.
 */
class DefaultDiagramNode implements DiagramNode {
    id:string;
    element:joint.shapes.devs.RectWithPorts;
    text:string;
    properties:{ [name: string]: string; };
    image:string;

    constructor(id:string, x:number, y:number, properties, image:string) {
        this.id = id;
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

    setText(text:string) {
        this.text = text;
    }

    getId() {
        return this.id;
    }

    getX() {
        return (this.element.get("position"))['x'];
    }

    getY() {
        return (this.element.get("position"))['y'];
    }

    getImagePath() {
        return this.image;
    }

    getElement() {
        return this.element;
    }

    setProperty(name:string, value:string) {
        this.properties[name] = value;
    }

    getProperties() {
        return this.properties;
    }
}