import mControl = module("emulator/model/ui/Control");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");

export class LinearLayout extends mControlPanel.ControlPanel {

    constructor(tag: mLinearLayoutTag.LinearLayoutTag) {
        super(tag);
        this.ElementJQuery = $("<div></div>");
        this.ElementJQuery.attr('id', tag.Id);
    }

    public addChild(child: mControl.Control) {
        super.addChild(child);
        this.ElementJQuery.append(child.ElementJQuery);
    }

    public create() {
        var childrenElements = this.ElementJQuery.children();;
        var childrens = this.getChildrens();
        childrens.map(child => child.create());

        $('#' + this.Tag.Id).layout({
            type: 'flexGrid',
            columns: 1,
            items: childrenElements
        });
    }
}