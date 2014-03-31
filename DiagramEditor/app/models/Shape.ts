class Shape {
    property1:string;
    property2:string;
    el:joint.shapes.basic.Generic;
    text:string;

    constructor(el:joint.shapes.basic.Generic) {
        this.el = el;
        this.text = "Text";
    }

    setText(text:string) {
        this.text = text;
        this.el.attr({
            text: {text: text }});
    }
}