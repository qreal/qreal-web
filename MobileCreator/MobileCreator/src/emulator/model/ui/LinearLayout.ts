import mControl = module("emulator/model/ui/Control");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");

export class LinearLayout extends mControlPanel.ControlPanel {

    constructor(tag: mLinearLayoutTag.LinearLayoutTag);
    constructor(tag: mLinearLayoutTag.LinearLayoutTag, elementJQuery: JQuery);
    constructor(tag: mLinearLayoutTag.LinearLayoutTag, elementJQuery?: JQuery = $("<div></div>")) {
        super(tag, elementJQuery);
    }

    public addChild(child: mControl.Control) {
        super.addChild(child);
        this.ElementJQuery.append(child.ElementJQuery);
    }

    public create() {
        var tag = <mLinearLayoutTag.LinearLayoutTag> this.Tag;
        var childrenElements = this.ElementJQuery.children();
        this.Childrens.map(child => child.create());

        var columns, rows;
        switch (tag.Orientation) {
            case mLinearLayoutTag.LinearLayoutTag.Horizontal:
                columns = 0;
                rows = 1;
                break;
            case mLinearLayoutTag.LinearLayoutTag.Vertical:
                columns = 1;
                rows = 0;
                break;
        }

        $('#' + tag.Id).layout({
            type: 'flexGrid',
            columns: columns,
            rows: rows,
            items: childrenElements
        });
    }
}