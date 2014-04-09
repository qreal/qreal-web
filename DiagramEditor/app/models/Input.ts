class Input implements Shape {
    id:string;
    type:NodeType;
    property1:string;
    property2:string;
    text:string;
    el:joint.shapes.devs.EllipseWithPorts;
    action : InputAction;

    constructor(el:joint.shapes.devs.EllipseWithPorts, id:string, action:string) {
        this.el = el;
        this.type = NodeType.Input;
        this.id = id;
        this.action = InputAction[action];
    }

    setText(text:string) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7 / 2, 'ref-y': .4 }
        });
    }

    getElement() {
        return this.el;
    }
}