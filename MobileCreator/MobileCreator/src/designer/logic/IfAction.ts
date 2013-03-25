import mAction = module("designer/logic/Action");

export class IfAction extends mAction.Action {
    private expression: string;
    private thenAction: mAction.Action;
    private elseAction: mAction.Action;

    constructor(expression: string, thenAction: mAction.Action, elseAction: mAction.Action) {
        super();
        this.expression = expression;
        this.thenAction = thenAction;
        this.elseAction = elseAction;
    }

    get Expression() {
        return this.expression;
    }
    set Expression(expression: string) {
        this.expression = expression;
    }
    get ThenAction() {
        return this.thenAction;
    }
    set ThenAction(thenAction: mAction.Action) {
        this.thenAction = thenAction;
    }
    get ElseAction() {
        return this.elseAction;
    }
    set ElseAction(elseAction: mAction.Action) {
        this.elseAction = elseAction;
    }
    public toXML() {
        var xml = "<if condition='" + this.expression + "'>\n"
        xml += "<then>\n"
        xml += this.thenAction.toXML();
        xml += "</then>\n";
        if (this.elseAction) {
            xml += "<else>\n";
            xml += this.elseAction.toXML();
            xml += "</else>\n";
        }
        xml += "</if>\n";
        return xml;
    }
}