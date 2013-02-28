import mControl = module("emulator/model/ui/Control");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");

export class LinearLayout extends mControlPanel.ControlPanel {

    constructor(tag: mLinearLayoutTag.LinearLayoutTag);
    constructor(tag: mLinearLayoutTag.LinearLayoutTag, $control: JQuery);
    constructor(tag: mLinearLayoutTag.LinearLayoutTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
    }

    public addChild(child: mControl.Control) {
        super.addChild(child);
        this.$Control.append(child.$Control);
    }

    public create() {
        var tag = <mLinearLayoutTag.LinearLayoutTag> this.Tag;
        var childrenElements = this.$Control.children();


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
        $('#' + tag.Id).css("width", "400px");
        //this.Childrens.map(child => child.create());
    }
}