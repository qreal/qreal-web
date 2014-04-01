class FinalNode implements Shape {
    type:NodeType;

    property1:string;
    property2:string;
    text:string;
    el:joint.shapes.devs.EllipseWithPorts;

    constructor(el:joint.shapes.devs.EllipseWithPorts) {
        this.el = el;
        this.type = NodeType.Final;
    }

    setText(text:string) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7/2, 'ref-y': .4 }
        });
    }
    getElement() {
        return this.el;
    }
}