
//#region Import
import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");
import mTextView = module("emulator/model/ui/TextView");
import mButton = module("emulator/model/ui/Button");
import mImageView = module("emulator/model/ui/ImageView");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayout = module("emulator/model/ui/LinearLayout");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");
import mControlTag = module("emulator/model/attributes/ControlTag");
import mControlPanelTag = module("emulator/model/attributes/ControlPanelTag");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mImageViewTag = module("emulator/model/attributes/ImageViewTag");
//#endregion

export class XmlManager {
    private logger = new mLog.Logger("XmlManager");
    
    //#region Consts
    private static LinearLayout = "LinearLayout";
    private static TextView = "TextView";
    private static Button = "Button";
    private static ImageView = "ImageView";

    //#endregion

    private root: mControlPanel.ControlPanel;

    constructor() {
        this.logger.log("in constructor");
    }

    public parsePage() {
        this.logger.log("parse page");
        var xmlHTTP = new XMLHttpRequest();
        var xmlDoc: Document;
        try {
            xmlHTTP.open("GET", "res/main2.xml", false);
            xmlHTTP.send(null);
            xmlDoc = xmlHTTP.responseXML;
        }
        catch (e) {
            window.alert("Unable to load the requested file.");
            return;
        }

        this.parse(xmlDoc.firstChild);
        return this.root;
    }

    private parse(node: Node) {
        this.root = this.parseNode(node);
    }

    private parseNode(node: Node) {
        this.logger.log("parse node: " + node.nodeName)
        var control: mControl.Control;
        switch (node.nodeName) {
            case XmlManager.LinearLayout:
                control = this.parseLinearLayout(node);
                break;
            case XmlManager.TextView:
                control = this.parseTextView(node);
                break;
            case XmlManager.Button:
                control = this.parseButton(node);
                break;
            case XmlManager.ImageView:
                control = this.parseImageView(node);
                break;
        }
        return control;
    }

    private parseLinearLayout(node: Node) {
        this.logger.log("parseLinearLayout");
        var tag = new mLinearLayoutTag.LinearLayoutTag();
        this.fillLinearLayoutData(node, tag);

        var linearLayout = new mLinearLayout.LinearLayout(tag);

        var length = node.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = this.parseNode(node.childNodes.item(i));
            if (child) {
                linearLayout.addChild(child);
            }
        }
        return linearLayout;
    }

    private parseTextView(node: Node) {
        this.logger.log("parseTextView");
        var tag = new mTextViewTag.TextViewTag();
        this.fillTextViewData(node, tag);
        var textView = new mTextView.TextView(tag);
        return textView;
    }

    private parseButton(node: Node) {
        this.logger.log("parseButton");
        var tag = new mButtonTag.ButtonTag();
        this.fillTextViewData(node, tag);
        var button = new mButton.Button(tag);
        return button;
    }

    private parseImageView(node: Node) {
        this.logger.log("parseImageView");
        var tag = new mImageViewTag.ImageViewTag();
        this.fillImageViewData(node, tag);
        var imageView = new mImageView.ImageView(tag);
        return imageView;
    }

    private fillLinearLayoutData(node: Node, tag: mLinearLayoutTag.LinearLayoutTag) {
        this.fillControlPanelData(node, tag);

        var orientation: Attr = node.attributes['orientation'];
        if (orientation) {
            this.logger.log("orientation: " + orientation.value);
            tag.Orientation = orientation.value == 'vertical' ?
                mLinearLayoutTag.LinearLayoutTag.Vertical :
                mLinearLayoutTag.LinearLayoutTag.Horizontal
        }     
    }

    private fillTextViewData(node: Node, tag: mTextViewTag.TextViewTag) {
        this.fillControlTagData(node, tag);

        var text: Attr = node.attributes['text'];
        if (text) {
            this.logger.log("text: " + text.value);
            tag.Text = text.value;
        }

        var textSize: Attr = node.attributes['textSize'];
        if (textSize) {
            this.logger.log("textSize: " + textSize.value);
            tag.TextSize = parseInt(textSize.value); //20dp -> 20
        }
    }

    private fillButtonData(node: Node, tag: mButtonTag.ButtonTag) {
        this.fillTextViewData(node, tag);
    }

    private fillImageViewData(node: Node, tag: mImageViewTag.ImageViewTag) {
        this.fillControlTagData(node, tag);
        var src: Attr = node.attributes['src'];
        if (src) {
            this.logger.log("src: " + src.value);
            tag.ImageUrl = src.value;
        }
    }

    private fillControlPanelData(node: Node, tag: mControlPanelTag.ControlPanelTag) {
        this.fillControlTagData(node, tag);
        var background: Attr = node.attributes['background'];
        if (background) {
            this.logger.log("background: " + background.value);
            tag.Background = background.value;
        }
    }

    private fillControlTagData(node: Node, tag: mControlTag.ControlTag) {
        var layout_width: Attr = node.attributes['layout_width'];
        if (layout_width) {
            this.logger.log("layout_width: " + layout_width.value);
            switch (layout_width.value) {
                case 'wrap_content':
                    tag.Width = mControlTag.ControlTag.WrapContent;
                    break;
                case 'fill_parent':
                    tag.Width = mControlTag.ControlTag.MatchParrent;
                    break;
                default:
                    tag.Width = parseInt(layout_width.value);
                    break;
            }
        }

        var layout_height: Attr = node.attributes['layout_height'];
        if (layout_height) {
            this.logger.log("layout_height: " + layout_height.value);
            switch (layout_height.value) {
                case 'wrap_content':
                    tag.Height = mControlTag.ControlTag.WrapContent;
                    break;
                case 'fill_parent':
                    tag.Height = mControlTag.ControlTag.MatchParrent;
                    break;
                default:
                    tag.Height = parseInt(layout_height.value);
                    break;
        }
    }

}