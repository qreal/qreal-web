interface Shape {
    property1:string;
    property2:string;
    text:string;
    type : NodeType;
    setText(text:string);
    getElement();
}

enum NodeType {
    Action,
    Condition,
    Final,
    Initial
}