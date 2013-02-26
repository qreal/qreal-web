import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");

export class LinearLayout extends mControlPanel.ControlPanel {

    constructor(tag: mLinearLayoutTag.LinearLayoutTag) {
        super(tag);
    }

    public getElement() {
        this.element = $("<div id='" + this.Tag.Id + "'></div>");
        var childrens = this.getChildrens();
        for (var i in childrens) {
            this.element.append(childrens[i].getElement());
        }
        return this.element;
    }

    public create() {
        var childrenElements: JQuery[] = new Array();
        var childrens = this.getChildrens();
        for (var i in childrens) {
            childrenElements.push($("#" + childrens[i].id));
            childrens[i].create();
        }

        jQuery(function ($) {
            $('#code').layout({
                type: 'flexGrid',
                columns: 1,
                items: childrenElements
            });
        });
    }
}