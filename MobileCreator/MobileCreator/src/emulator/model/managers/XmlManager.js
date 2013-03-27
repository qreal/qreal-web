define(["require", "exports", "utils/log/Log", "emulator/model/logic/Logic", "emulator/model/logic/Trigger", "emulator/model/managers/EventManager", "emulator/model/Page", "emulator/model/ui/TextView", "emulator/model/ui/Button", "emulator/model/ui/Input", "emulator/model/ui/ImageView", "emulator/model/ui/WebView", "emulator/model/ui/Map", "emulator/model/ui/LinearLayout", "emulator/model/attributes/LinearLayoutTag", "emulator/model/attributes/ControlTag", "emulator/model/attributes/TextViewTag", "emulator/model/attributes/ButtonTag", "emulator/model/attributes/InputTag", "emulator/model/attributes/ImageViewTag", "emulator/model/attributes/WebViewTag", "emulator/model/attributes/MapTag"], function(require, exports, __mLog__, __mLogic__, __mTrigger__, __mEventManager__, __mPage__, __mTextView__, __mButton__, __mInput__, __mImageView__, __mWebView__, __mMap__, __mLinearLayout__, __mLinearLayoutTag__, __mControlTag__, __mTextViewTag__, __mButtonTag__, __mInputTag__, __mImageViewTag__, __mWebViewTag__, __mMapTag__) {
    var mLog = __mLog__;

    var mLogic = __mLogic__;

    var mTrigger = __mTrigger__;

    var mEventManager = __mEventManager__;

    
    
    var mPage = __mPage__;

    var mTextView = __mTextView__;

    var mButton = __mButton__;

    var mInput = __mInput__;

    var mImageView = __mImageView__;

    var mWebView = __mWebView__;

    var mMap = __mMap__;

    
    var mLinearLayout = __mLinearLayout__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var mControlTag = __mControlTag__;

    
    var mTextViewTag = __mTextViewTag__;

    var mButtonTag = __mButtonTag__;

    var mInputTag = __mInputTag__;

    var mImageViewTag = __mImageViewTag__;

    var mWebViewTag = __mWebViewTag__;

    var mMapTag = __mMapTag__;

    var XmlManager = (function () {
        function XmlManager() {
            this.logger = new mLog.Logger("XmlManager");
            this.logicFunctionFactory = new mLogic.FunctionFactory();
            this.logger.log("in constructor");
        }
        XmlManager.App = "application";
        XmlManager.Forms = "forms";
        XmlManager.Form = "form";
        XmlManager.FormName = "form_name";
        XmlManager.LinearLayout = "LinearLayout";
        XmlManager.TextView = "TextView";
        XmlManager.EditText = "EditText";
        XmlManager.Button = "Button";
        XmlManager.ImageView = "ImageView";
        XmlManager.WebView = "WebView";
        XmlManager.Map = "Map";
        XmlManager.Logic = "logic";
        XmlManager.Trigger = "trigger";
        XmlManager.FormId = "form-id";
        XmlManager.Event = "event";
        XmlManager.Action = "action";
        XmlManager.ControlId = "control-id";
        XmlManager.Seq = "seq";
        XmlManager.SeqFirst = "first-operator";
        XmlManager.SeqSecond = "second-operator";
        XmlManager.If = "if";
        XmlManager.Then = "then";
        XmlManager.Else = "else";
        XmlManager.Transition = "transition";
        XmlManager.LoginRequest = "login-request";
        XmlManager.SaveSession = "save-session";
        XmlManager.PatientsRequest = "patients-request";
        XmlManager.ShowMap = "showmap";
        XmlManager.prototype.parseStoredXml = function (page) {
            this.logger.log("parseStoredXml: " + page);
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
            return this.parseApplication(xmlDoc.firstChild);
        };
        XmlManager.prototype.parseXmlString = function (xmlString) {
            this.logger.log("parseXmlString");
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlString, "text/xml");
            return this.parseApplication(xmlDoc.firstChild);
        };
        XmlManager.prototype.parseApplication = function (node) {
            this.logger.log("parseApplication: " + node.nodeName);
            var pages;
            var triggers;
            for(var i = 0; i < node.childNodes.length; i++) {
                var childNode = node.childNodes.item(i);
                switch(childNode.nodeName) {
                    case XmlManager.Forms:
                        pages = this.parseForms(childNode);
                        break;
                    case XmlManager.Logic:
                        triggers = this.parseLogic(childNode);
                        break;
                }
            }
            return {
                pages: pages,
                triggers: triggers
            };
        };
        XmlManager.prototype.parseLogic = function (node) {
            this.logger.log("parseLogic: " + node.nodeName);
            var triggers = [];
            var length = node.childNodes.length;
            for(var i = 0; i < length; i++) {
                var child = node.childNodes.item(i);
                switch(child.nodeName) {
                    case XmlManager.Trigger:
                        triggers.push(this.parseTrigger(child));
                        break;
                    case XmlManager.Action:
                        triggers.push(this.parseActionTrigger(child));
                        break;
                }
            }
            return triggers;
        };
        XmlManager.prototype.parseTrigger = function (node) {
            var formId = node.attributes['form-id'].value;
            var event = node.attributes['event'].value;
            this.logger.log("parseTrigger formId=" + formId + " event=" + event);
            var triggerFunc;
            var length = node.childNodes.length;
            for(var i = 0; i < length; i++) {
                var child = node.childNodes.item(i);
                var func = this.parseLogicNode(child);
                if(func) {
                    triggerFunc = func;
                }
            }
            return new mTrigger.Trigger(formId, event, triggerFunc);
        };
        XmlManager.prototype.parseActionTrigger = function (node) {
            var controlId = node.attributes['control-id'].value;
            var event = mEventManager.EventManager.OnAction;
            this.logger.log("parseTrigger formId=" + controlId + " event=" + event);
            var triggerFunc;
            var length = node.childNodes.length;
            for(var i = 0; i < length; i++) {
                var child = node.childNodes.item(i);
                var func = this.parseLogicNode(child);
                if(func) {
                    triggerFunc = func;
                }
            }
            return new mTrigger.Trigger(controlId, event, triggerFunc);
        };
        XmlManager.prototype.parseLogicNode = function (node) {
            this.logger.log("parse logic node: " + node.nodeName);
            switch(node.nodeName) {
                case XmlManager.Seq:
                    return this.parseSeq(node);
                    break;
                case XmlManager.Transition:
                    return this.parseTransition(node);
                    break;
                case XmlManager.LoginRequest:
                    return this.parseLoginRequest(node);
                    break;
                default:
                    return undefined;
                    break;
            }
        };
        XmlManager.prototype.parseSeq = function (node) {
            this.logger.log("parseSeq");
            var first;
            var second;
            var length = node.childNodes.length;
            for(var i = 0; i < length; i++) {
                var child = node.childNodes.item(i);
                switch(child.nodeName) {
                    case XmlManager.SeqFirst:
                        first = this.parseLogicNode(child);
                        break;
                    case XmlManager.SeqSecond:
                        second = this.parseLogicNode(child);
                        break;
                }
            }
            return this.logicFunctionFactory.seqFunc(first, second);
        };
        XmlManager.prototype.parseTransition = function (node) {
            this.logger.log("parseTransition");
            var formId = node.attributes['form-id'].value;
            return this.logicFunctionFactory.transitionFunc(formId);
        };
        XmlManager.prototype.parseLoginRequest = function (node) {
            this.logger.log("parseLoginRequest");
            var url = node.attributes['url'].value;
            var loginId = node.attributes['login-id'].value;
            var passwordId = node.attributes['password-id'].value;
            return this.logicFunctionFactory.loginRequestFunc(url, loginId, passwordId);
        };
        XmlManager.prototype.parseForms = function (node) {
            var forms = [];
            for(var i = 0; i < node.childNodes.length; i++) {
                if(node.childNodes.item(i).nodeName == XmlManager.Form) {
                    forms.push(this.parseForm(node.childNodes.item(i)));
                }
            }
            return forms;
        };
        XmlManager.prototype.parseForm = function (node) {
            this.logger.log("parseForm: " + node.nodeName);
            var name = node.attributes['form_name'].value;
            var view = this.parseNode(node.childNodes.item(1));
            return new mPage.Page(name, view);
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
                case XmlManager.EditText:
                    control = this.parseInput(node);
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
                case XmlManager.Map:
                    control = this.parseMap(node);
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
        XmlManager.prototype.parseInput = function (node) {
            this.logger.log("parseInput");
            var tag = new mInputTag.InputTag();
            this.fillInputData(node, tag);
            var input = new mInput.Input(tag);
            return input;
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
        XmlManager.prototype.parseMap = function (node) {
            this.logger.log("parseMap");
            var tag = new mMapTag.MapTag();
            this.fillControlTagData(node, tag);
            var map = new mMap.Map(tag);
            return map;
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
        XmlManager.prototype.fillInputData = function (node, tag) {
            this.fillTextViewData(node, tag);
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
        return XmlManager;
    })();
    exports.XmlManager = XmlManager;    
})
//@ sourceMappingURL=XmlManager.js.map
