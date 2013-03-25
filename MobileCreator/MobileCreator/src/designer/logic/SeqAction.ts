import mAction = module("designer/logic/Action");

export class SeqAction extends mAction.Action {
    private firstAction: mAction.Action;
    private secondAction: mAction.Action;

    constructor(firstAction: mAction.Action, secondAction: mAction.Action) {
        super();
        this.firstAction = firstAction;
        this.secondAction = secondAction;
    }
    get FirstAction() {
        return this.firstAction;
    }
    set FirstAction(firstAction: mAction.Action) {
        this.firstAction = firstAction;
    }
    get SecondAction() {
        return this.secondAction;
    }
    set SecondAction(secondAction: mAction.Action) {
        this.secondAction = secondAction;
    }
    public toXML() {
        var xml = "<seq>\n"; if (this.secondAction) {
            xml += "<first-operator>\n";
            xml += this.firstAction.toXML();
            xml += "</first-operator>\n";
        }
        if (this.secondAction) {
            xml += "<second-operator>\n";
            xml += this.secondAction.toXML();
            xml += "</second-operator>\n";
        }
        xml += "</seq>\n";
        return xml;
    }
}