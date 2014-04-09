class Label implements Shape {
    id:string;
    type:NodeType;
    property1:string;
    property2:string;
    text:string;
    el:joint.shapes.devs.Diamond;

    constructor(el:joint.shapes.devs.Diamond, id:string) {
        this.el = el;
        this.type = NodeType.Label;
        this.id = id;
    }


    setText(text:string) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .3, 'ref-y': .4 }
        });
    }
    getElement() {
        return this.el;
    }
}