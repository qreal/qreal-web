/**
 * Created by vladzx on 10.10.14.
 */
interface DiagramNode {
    name : string;
    text : string;
    properties : { [name: string]: string; };
    image : string;
    setText(text:string);
    getName();
    getX();
    getY();
    getImagePath();
    getElement();
    setProperty(name:string, value:string);
    getProperties();
}
