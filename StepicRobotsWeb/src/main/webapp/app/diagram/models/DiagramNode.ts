/**
 * Created by vladzx on 10.10.14.
 */
interface DiagramNode {
    name: string;
    text: string;
    type: string;
    properties: PropertiesMap;
    image: string;
    setText(text:string): void;
    getName(): string;
    getType(): string;
    getX(): number;
    getY(): number;
    getImagePath(): string;
    getElement();
    setProperty(name: string, property: Property): void;
    getProperties(): PropertiesMap;
}
