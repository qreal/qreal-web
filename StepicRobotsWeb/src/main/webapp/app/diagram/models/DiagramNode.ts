/**
 * Created by vladzx on 10.10.14.
 */
interface DiagramNode {
    setText(text:string): void;
    getType(): string;
    getX(): number;
    getY(): number;
    getImagePath(): string;
    getElement();
    setProperty(name: string, property: Property): void;
    getProperties(): PropertiesMap;
}
