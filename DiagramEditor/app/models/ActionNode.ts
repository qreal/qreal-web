class ActionNode implements Shape {
    type:NodeType;
    property1:string;
    property2:string;
    el:joint.shapes.devs.RectWithPorts;
    text:string;

    constructor(el:joint.shapes.devs.RectWithPorts) {
        this.el = el;
        this.type = NodeType.Action;
    }

    setText(text:string) {
        this.text = text;
        this.el.attr({
                '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
            }
        )
    }
    getElement() {
        return this.el;
    }
}