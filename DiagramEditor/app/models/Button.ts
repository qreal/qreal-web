class Button implements Shape {
    id:string;
    type:NodeType;
    property1:string;
    property2:string;
    el:joint.shapes.devs.RectWithPorts;
    text:string;
    action : ButtonAction;

    constructor(el:joint.shapes.devs.RectWithPorts, id : string, action : string) {
        this.el = el;
        this.type = NodeType.Button;
        this.id = id;
        this.action = ButtonAction[action];
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