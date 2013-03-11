import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayout = module("emulator/model/ui/LinearLayout");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");
import mControlTag = module("emulator/model/attributes/ControlTag");

export class XmlManager {
    private logger = new mLog.Logger("XmlManager");

    private static LinearLayout = "LinearLayout";

    private root: mControlPanel.ControlPanel;

    constructor() {
        this.logger.log("in constructor");
    }

    public parsePage() {
        this.logger.log("parse page");
        var xmlHTTP = new XMLHttpRequest();
        var xmlDoc: Document;
        try {
            xmlHTTP.open("GET", "res/main.xml", false);
            xmlHTTP.send(null);
            xmlDoc = xmlHTTP.responseXML;
        }
        catch (e) {
            window.alert("Unable to load the requested file.");
            return;
        }

        this.parseNode(xmlDoc.firstChild);
    }

    private parseNode(node: Node) {
        this.logger.log("parse node: " + node.nodeName);
        switch (node.nodeName) {
            case XmlManager.LinearLayout:
                this.parseLinearLayout(node);
                break;
        }
    }


    private parseLinearLayout(node: Node) {
        var tag = new mLinearLayoutTag.LinearLayoutTag();

        var orientation = node.attributes['orientation'];
        if (orientation) {
            tag.Orientation = orientation == 'vertical' ?
                mLinearLayoutTag.LinearLayoutTag.Vertical :
                mLinearLayoutTag.LinearLayoutTag.Horizontal
        } else {
            tag.Orientation = mLinearLayoutTag.LinearLayoutTag.Vertical;
        }

        var layout_width = node.attributes['layout_width'];
        if (layout_width) {
            tag.Width = layout_width == 'wrap_content' ?
                mControlTag.ControlTag.WrapContent :
                mControlTag.ControlTag.MatchParrent;
        } else {
            tag.Width = mControlTag.ControlTag.MatchParrent;
        }

        var layout_height = node.attributes['layout_height'];
        if (layout_height) {
            tag.Height = layout_height == 'wrap_content' ?
                mControlTag.ControlTag.WrapContent :
                mControlTag.ControlTag.MatchParrent;
        } else {
            tag.Height = mControlTag.ControlTag.MatchParrent;
        }

        var background = node.attributes['background'];
        if (background) {
            tag.Background = background;
        }

        return new mLinearLayout.LinearLayout(tag);
    }

}