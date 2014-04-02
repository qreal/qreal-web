class ConditionNode implements Shape {
    type:NodeType;
    property1:string;
    property2:string;
    text:string;
    el:joint.shapes.devs.Diamond;

    constructor(el:joint.shapes.devs.Diamond) {
        this.el = el;
        this.type = NodeType.Condition;
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