import mControl = module("emulator/model/ui/Control");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");

export class LinearLayout extends mControlPanel.ControlPanel {

    constructor(tag: mLinearLayoutTag.LinearLayoutTag) {
        super(tag);
        this.ElementJQuery = $("<div id='" + this.Tag.Id + "'></div>");
    }

    public addChild(child: mControl.Control) {
        super.addChild(child);
        this.ElementJQuery.append(child.ElementJQuery);
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