import mAction = module("designer/logic/Action");
import mCodeBlock = module("designer/logic/CodeBlock");

export class IfAction extends mAction.Action {
    private expression: string;
    private thenBlock: mCodeBlock.CodeBlock;
    private elseBlock: mCodeBlock.CodeBlock;
    private marginLeft;

    constructor(marginLeft) {
        super();
        this.expression = "loginSuccess";
        this.thenBlock = new mCodeBlock.CodeBlock(marginLeft + 10);
        this.elseBlock = new mCodeBlock.CodeBlock(marginLeft + 10);
    }

    public show() {
    }

    get Expression() {
        return this.expression;
    }
    set Expression(expression: string) {
        this.expression = expression;
    }
    get ThenBlock() {
        return this.thenBlock;
    }
    set ThenBlock(thenBlock: mCodeBlock.CodeBlock) {
        this.thenBlock = thenBlock;
    }
    get ElseBlock() {
        return this.elseBlock;
    }
    set ElseAction(elseBlock: mCodeBlock.CodeBlock) {
        this.elseBlock = elseBlock;
    }
    public toXML() {
        var xml = "<if condition='" + this.expression + "'>\n"
        xml += "<then>\n"
        xml += this.thenBlock.toXML();
        xml += "</then>\n";
        if (this.elseBlock.Actions.length > 0) {
            xml += "<else>\n";
            xml += this.elseBlock.toXML();
            xml += "</else>\n";
        }
        xml += "</if>\n";
        return xml;
    }
}