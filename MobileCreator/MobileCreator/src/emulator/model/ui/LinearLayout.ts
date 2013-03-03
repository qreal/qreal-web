import mControl = module("emulator/model/ui/Control");
import mControlTag = module("emulator/model/attributes/ControlTag");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");

export class LinearLayout extends mControlPanel.ControlPanel {

    constructor(tag: mLinearLayoutTag.LinearLayoutTag);
    constructor(tag: mLinearLayoutTag.LinearLayoutTag, $control: JQuery);
    constructor(tag: mLinearLayoutTag.LinearLayoutTag, $control?: JQuery = $("<div></div>")) {
        super(tag, $control);
        this.setDimensions();
    }

    public addChild(child: mControl.Control) {
        super.addChild(child);
        this.$Control.append(child.$Control);
    }

    public create() {
        var tag = <mLinearLayoutTag.LinearLayoutTag> this.Tag;
        var childrenElements = this.$Control.children();
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
        
        this.$Control.trigger('create');
        this.$Control.layout({
            type: 'flexGrid',
            columns: columns,
            rows: rows,
            items: childrenElements
        });
        this.setDimensions();
    }
}