/**
 * Created by vladzx on 10.10.14.
 */
interface DiagramNode {
    text:string;
    properties: { [name: string]: string; };
    setText(text:string);
    getElement();
    setProperty(name: string, value: string);
    getProperties();
}
