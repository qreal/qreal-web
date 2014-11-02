/**
 * Created by vladzx on 10.10.14.
 */
interface DiagramNode {
    id : string;
    text : string;
    properties : { [name: string]: string; };
    image : string;
    setText(text:string);
    getId();
    getX();
    getY();
    getImagePath();
    getElement();
    setProperty(name:string, value:string);
    getProperties();
}
