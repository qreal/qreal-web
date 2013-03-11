define(["require", "exports", "utils/log/Log", "emulator/model/ui/TextView", "emulator/model/ui/Button", "emulator/model/ui/ImageView", "emulator/model/ui/LinearLayout", "emulator/model/attributes/LinearLayoutTag", "emulator/model/attributes/ControlTag", "emulator/model/attributes/TextViewTag", "emulator/model/attributes/ButtonTag", "emulator/model/attributes/ImageViewTag"], function(require, exports, __mLog__, __mTextView__, __mButton__, __mImageView__, __mLinearLayout__, __mLinearLayoutTag__, __mControlTag__, __mTextViewTag__, __mButtonTag__, __mImageViewTag__) {
    var mLog = __mLog__;

    
    var mTextView = __mTextView__;

    var mButton = __mButton__;

    var mImageView = __mImageView__;

    
    var mLinearLayout = __mLinearLayout__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var mControlTag = __mControlTag__;

    
    var mTextViewTag = __mTextViewTag__;

    var mButtonTag = __mButtonTag__;

    var mImageViewTag = __mImageViewTag__;

    var XmlManager = (function () {
        function XmlManager() {
            this.logger = new mLog.Logger("XmlManager");
            this.logger.log("in constructor");
        }
        XmlManager.LinearLayout = "LinearLayout";
        XmlManager.TextView = "TextView";
        XmlManager.Button = "Button";
        XmlManager.ImageView = "ImageView";
        XmlManager.prototype.parsePage = function () {
            this.logger.log("parse page");
            var xmlHTTP = new XMLHttpRequest();
            var xmlDoc;
            try  {
                xmlHTTP.open("GET", "res/main2.xml", false);
                xmlHTTP.send(null);
                xmlDoc = xmlHTTP.responseXML;
            } catch (e) {
                window.alert("Unable to load the requested file.");
                return;
            }
            this.parse(xmlDoc.firstChild);
            return this.root;
        };
        XmlManager.prototype.parse = function (node) {
            this.root = this.parseNode(node);
        };
        XmlManager.prototype.parseNode = function (node) {
            this.logger.log("parse node: " + node.nodeName);
            var control;
            switch(node.nodeName) {
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
        };
        XmlManager.prototype.parseLinearLayout = function (node) {
            this.logger.log("parseLinearLayout");
            var tag = new mLinearLayoutTag.LinearLayoutTag();
            this.fillLinearLayoutData(node, tag);
            var linearLayout = new mLinearLayout.LinearLayout(tag);
            var length = node.childNodes.length;
            for(var i = 0; i < length; i++) {
                var child = this.parseNode(node.childNodes.item(i));
                if(child) {
                    linearLayout.addChild(child);
                }
            }
            return linearLayout;
        };
        XmlManager.prototype.parseTextView = function (node) {
            this.logger.log("parseTextView");
            var tag = new mTextViewTag.TextViewTag();
            this.fillTextViewData(node, tag);
            var textView = new mTextView.TextView(tag);
            return textView;
        };
        XmlManager.prototype.parseButton = function (node) {
            this.logger.log("parseButton");
            var tag = new mButtonTag.ButtonTag();
            this.fillTextViewData(node, tag);
            var button = new mButton.Button(tag);
            return button;
        };
        XmlManager.prototype.parseImageView = function (node) {
            this.logger.log("parseImageView");
            var tag = new mImageViewTag.ImageViewTag();
            this.fillImageViewData(node, tag);
            var imageView = new mImageView.ImageView(tag);
            return imageView;
        };
        XmlManager.prototype.fillLinearLayoutData = function (node, tag) {
            this.fillControlPanelData(node, tag);
            var orientation = node.attributes['orientation'];
            if(orientation) {
                this.logger.log("orientation: " + orientation.value);
                tag.Orientation = orientation.value == 'vertical' ? mLinearLayoutTag.LinearLayoutTag.Vertical : mLinearLayoutTag.LinearLayoutTag.Horizontal;
            }
        };
        XmlManager.prototype.fillTextViewData = function (node, tag) {
            this.fillControlTagData(node, tag);
            var text = node.attributes['text'];
            if(text) {
                this.logger.log("text: " + text.value);
                tag.Text = text.value;
            }
            var textSize = node.attributes['textSize'];
            if(textSize) {
                this.logger.log("textSize: " + textSize.value);
                tag.TextSize = parseInt(textSize.value);
            }
        };
        XmlManager.prototype.fillButtonData = function (node, tag) {
            this.fillTextViewData(node, tag);
        };
        XmlManager.prototype.fillImageViewData = function (node, tag) {
            this.fillControlTagData(node, tag);
            var src = node.attributes['src'];
            if(src) {
                this.logger.log("src: " + src.value);
                tag.ImageUrl = src.value;
            }
        };
        XmlManager.prototype.fillControlPanelData = function (node, tag) {
            this.fillControlTagData(node, tag);
            var background = node.attributes['background'];
            if(background) {
                this.logger.log("background: " + background.value);
                tag.Background = background.value;
            }
        };
        XmlManager.prototype.fillControlTagData = function (node, tag) {
            var layout_width = node.attributes['layout_width'];
            if(layout_width) {
                this.logger.log("layout_width: " + layout_width.value);
                switch(layout_width.value) {
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
            var layout_height = node.attributes['layout_height'];
            if(layout_height) {
                this.logger.log("layout_height: " + layout_height.value);
                switch(layout_height.value) {
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
        };
        return XmlManager;
    })();
    exports.XmlManager = XmlManager;    
})
