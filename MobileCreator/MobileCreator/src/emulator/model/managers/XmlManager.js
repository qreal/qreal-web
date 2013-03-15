define(["require", "exports", "utils/log/Log", "emulator/model/Emulator", "emulator/model/ui/TextView", "emulator/model/ui/Button", "emulator/model/ui/ImageView", "emulator/model/ui/WebView", "emulator/model/ui/LinearLayout", "emulator/model/attributes/LinearLayoutTag", "emulator/model/attributes/ControlTag", "emulator/model/attributes/TextViewTag", "emulator/model/attributes/ButtonTag", "emulator/model/attributes/ImageViewTag", "emulator/model/attributes/WebViewTag"], function(require, exports, __mLog__, __mEmulator__, __mTextView__, __mButton__, __mImageView__, __mWebView__, __mLinearLayout__, __mLinearLayoutTag__, __mControlTag__, __mTextViewTag__, __mButtonTag__, __mImageViewTag__, __mWebViewTag__) {
    var mLog = __mLog__;

    var mEmulator = __mEmulator__;

    
    var mTextView = __mTextView__;

    var mButton = __mButton__;

    var mImageView = __mImageView__;

    var mWebView = __mWebView__;

    
    var mLinearLayout = __mLinearLayout__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var mControlTag = __mControlTag__;

    
    var mTextViewTag = __mTextViewTag__;

    var mButtonTag = __mButtonTag__;

    var mImageViewTag = __mImageViewTag__;

    var mWebViewTag = __mWebViewTag__;

    var XmlManager = (function () {
        function XmlManager() {
            this.logger = new mLog.Logger("XmlManager");
            this.logger.log("in constructor");
        }
        XmlManager.Forms = "forms";
        XmlManager.Form = "form";
        XmlManager.FormName = "form_name";
        XmlManager.LinearLayout = "LinearLayout";
        XmlManager.TextView = "TextView";
        XmlManager.Button = "Button";
        XmlManager.ImageView = "ImageView";
        XmlManager.WebView = "WebView";
        XmlManager.prototype.parsePage = function (page) {
            this.logger.log("parse page: " + page);
            var xmlHTTP = new XMLHttpRequest();
            var xmlDoc;
            try  {
                xmlHTTP.open("GET", page, false);
                xmlHTTP.send(null);
                xmlDoc = xmlHTTP.responseXML;
            } catch (e) {
                window.alert("Unable to load the requested file.");
                return undefined;
            }
            return this.parseNode(xmlDoc.firstChild);
        };
        XmlManager.prototype.parseXmlString = function (xmlString) {
            this.logger.log("parseXmlString");
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlString, "text/xml");
            return this.parseForms(xmlDoc.firstChild);
        };
        XmlManager.prototype.parseForms = function (node) {
            this.logger.log("parseForms: " + node.nodeName);
            for(var i = 0; i < node.childNodes.length; i++) {
                if(node.childNodes.item(i).nodeName == XmlManager.Form) {
                    this.parseForm(node.childNodes.item(i));
                }
            }
            return this.firstPageName;
        };
        XmlManager.prototype.parseForm = function (node) {
            this.logger.log("parseForm: " + node.nodeName);
            var name = node.attributes['form_name'].value;
            if(!this.firstPageName) {
                this.firstPageName = name;
                this.logger.log("firstPageName" + this.firstPageName);
            }
            var view = this.parseNode(node.childNodes.item(1));
            mEmulator.Emulator.instance.NavigationManager.addPage(name, view);
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
                case XmlManager.WebView:
                    control = this.parseWebView(node);
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
            this.logger.log("parseLinearLayout length: " + length);
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
            this.fillButtonData(node, tag);
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
        XmlManager.prototype.parseWebView = function (node) {
            this.logger.log("parseWebView");
            var tag = new mWebViewTag.WebViewTag();
            this.fillWebViewData(node, tag);
            var webView = new mWebView.WebView(tag);
            return webView;
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
            var onClick = node.attributes['onClick'];
            if(onClick) {
                this.logger.log("onClick: " + onClick.value);
                tag.OnClick = onClick.value;
            }
        };
        XmlManager.prototype.fillImageViewData = function (node, tag) {
            this.fillControlTagData(node, tag);
            var src = node.attributes['src'];
            if(src) {
                this.logger.log("src: " + src.value);
                tag.ImageUrl = src.value;
            }
        };
        XmlManager.prototype.fillWebViewData = function (node, tag) {
            this.fillControlTagData(node, tag);
            var url = node.attributes['url'];
            if(url) {
                this.logger.log("url: " + url.value);
                tag.Url = url.value;
            }
        };
        XmlManager.prototype.fillControlPanelData = function (node, tag) {
            this.fillControlTagData(node, tag);
        };
        XmlManager.prototype.fillControlTagData = function (node, tag) {
            var id = node.attributes['id'];
            if(id) {
                this.logger.log("id: " + id.value);
                tag.Id = id.value;
            }
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
            var background = node.attributes['background'];
            if(background) {
                this.logger.log("background: " + background.value);
                tag.Background = background.value;
            }
            var gravity = node.attributes['gravity'];
            if(gravity) {
                this.logger.log("gravity: " + gravity.value);
                tag.Gravity = gravity.value;
            }
            var layout_marginTop = node.attributes['layout_marginTop'];
            if(layout_marginTop) {
                this.logger.log("layout_marginTop: " + layout_marginTop.value);
                tag.MarginTop = parseInt(layout_marginTop.value);
            }
            var layout_marginBottom = node.attributes['layout_marginBottom'];
            if(layout_marginBottom) {
                this.logger.log("layout_marginBottom: " + layout_marginBottom.value);
                tag.MarginBottom = parseInt(layout_marginBottom.value);
            }
            var layout_marginLeft = node.attributes['layout_marginLeft'];
            if(layout_marginLeft) {
                this.logger.log("layout_marginLeft: " + layout_marginLeft.value);
                tag.MarginLeft = parseInt(layout_marginLeft.value);
            }
            var layout_marginRight = node.attributes['layout_marginRight'];
            if(layout_marginRight) {
                this.logger.log("layout_marginRight: " + layout_marginRight.value);
                tag.MarginRight = parseInt(layout_marginRight.value);
            }
        };
        XmlManager.prototype.parseTransitionString = function (xmlString) {
            this.logger.log("parseTransitionString");
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlString, "text/xml");
        };
        return XmlManager;
    })();
    exports.XmlManager = XmlManager;    
})
