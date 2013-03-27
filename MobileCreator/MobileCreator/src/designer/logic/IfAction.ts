import mAction = module("designer/logic/Action");
import mCodeBlock = module("designer/logic/CodeBlock");
import mActionTypes = module("designer/logic/ActionTypes");

export class IfAction extends mAction.Action {
    private expression: string;
    private thenBlock: mCodeBlock.CodeBlock;
    private elseBlock: mCodeBlock.CodeBlock;
    private marginLeft;

    constructor(marginLeft) {
        super();
        this.marginLeft = marginLeft;
        this.ActionType = mActionTypes.ActionTypes.If;
        this.expression = "loginSuccess";
        this.thenBlock = new mCodeBlock.CodeBlock(marginLeft + 10);
        this.elseBlock = new mCodeBlock.CodeBlock(marginLeft + 10);
    }

    public showIf(domElement: JQuery, removeButton: JQuery) {
        var containDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
        containDiv.css("margin-left", this.marginLeft + "px");
        domElement.append(containDiv);
        var ifBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>If</a>");
        containDiv.append(ifBlock);
        ifBlock.button();
        var select = $("<select data-mini='true' data-inline='true'></select>");
        /*var 
        for (var i = 0; i < maps.length; i++) {
            var option = $("<option value='" + maps[i] + "'>" + maps[i] + "</option>");
            if (maps[i] == this.controlId) {
                option.attr("selected", "selected");
            }
            select.append(option);
        }*/
        containDiv.append(removeButton);
        removeButton.button();
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