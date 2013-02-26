import controlPanel = module("emulator/model/ui/ControlPanel");

export class LinearLayout extends controlPanel.ControlPanel {

    constructor(id: string) {
        super(id);
    }

    public getElement() {
        this.element = $("<div id='" + this.id + "'></div>");
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