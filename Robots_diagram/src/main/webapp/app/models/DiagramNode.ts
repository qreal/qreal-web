/**
 * Created by vladzx on 10.10.14.
 */
interface DiagramNode {
    name: string;
    text: string;
    properties: PropertiesMap;
    image: string;
    setText(text:string): void;
    getName(): string;
    getX(): number;
    getY(): number;
    getImagePath(): string;
    getElement();
    setProperty(name: string, value: string): void;
    getProperties(): PropertiesMap;
}
