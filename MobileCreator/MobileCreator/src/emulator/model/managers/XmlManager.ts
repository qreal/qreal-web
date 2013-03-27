
//#region Import
import mLog = module("utils/log/Log");
import mLogic = module("emulator/model/logic/Logic");
import mTrigger = module("emulator/model/logic/Trigger");
import mEventManager = module("emulator/model/managers/EventManager");
import mEmulator = module("emulator/model/Emulator");
import mControl = module("emulator/model/ui/Control");
import mPage = module("emulator/model/Page");
import mTextView = module("emulator/model/ui/TextView");
import mButton = module("emulator/model/ui/Button");
import mInput = module("emulator/model/ui/Input");
import mImageView = module("emulator/model/ui/ImageView");
import mWebView = module("emulator/model/ui/WebView");
import mMap = module("emulator/model/ui/Map");
import mControlPanel = module("emulator/model/ui/ControlPanel");
import mLinearLayout = module("emulator/model/ui/LinearLayout");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");
import mControlTag = module("emulator/model/attributes/ControlTag");
import mControlPanelTag = module("emulator/model/attributes/ControlPanelTag");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mInputTag = module("emulator/model/attributes/InputTag");
import mImageViewTag = module("emulator/model/attributes/ImageViewTag");
import mWebViewTag = module("emulator/model/attributes/WebViewTag");
import mMapTag = module("emulator/model/attributes/MapTag");
//#endregion

export class XmlManager {
    private logger = new mLog.Logger("XmlManager");

    //#region Consts
    private static App = "application";
    private static Forms = "forms";
    private static Form = "form";
    private static FormName = "form_name";

    private static LinearLayout = "LinearLayout";
    private static TextView = "TextView";
    private static EditText = "EditText";
    private static Button = "Button";
    private static ImageView = "ImageView";
    private static WebView = "WebView";
    private static Map = "Map";

    private static Logic = "logic";
    private static Trigger = "trigger";
    private static FormId = "form-id";
    private static Event = "event";
    private static Action = "action";
    private static ControlId = "control-id";

    private static Seq = "seq";
    private static SeqFirst = "first-operator";
    private static SeqSecond = "second-operator";

    private static If = "if";
    private static Then = "then";
    private static Else = "else";

    private static Transition = "transition";
    private static LoginRequest = "login-request";
    private static SaveSession = "save-session";
    private static PatientsRequest = "patients-request";
    private static ShowMap = "showmap";
    //#endregion

    private logicFunctionFactory: mLogic.FunctionFactory = new mLogic.FunctionFactory();

    constructor() {
        this.logger.log("in constructor");
    }

    public parseStoredXml(page: string) {
        this.logger.log("parseStoredXml: " + page);
        var xmlHTTP = new XMLHttpRequest();
        var xmlDoc: Document;
        try {
            xmlHTTP.open("GET", page, false);
            xmlHTTP.send(null);
            xmlDoc = xmlHTTP.responseXML;
        }
        catch (e) {
            window.alert("Unable to load the requested file.");
            return undefined;
        }
        return this.parseApplication(xmlDoc.firstChild);
    }

    public parseXmlString(xmlString: string) {
        this.logger.log("parseXmlString");
        var parser = new DOMParser();
        var xmlDoc: Document = parser.parseFromString(xmlString, "text/xml");
        return this.parseApplication(xmlDoc.firstChild);
    }

    private parseApplication(node: Node) {
        this.logger.log("parseApplication: " + node.nodeName);
        var pages: mPage.Page[];
        var triggers: mTrigger.Trigger[];
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNode = node.childNodes.item(i);
            switch (childNode.nodeName) {
                case XmlManager.Forms:
                    pages = this.parseForms(childNode);
                    break;
                case XmlManager.Logic:
                    triggers = this.parseLogic(childNode);
                    break
            }
        }
      
        return {
            pages: pages,
            triggers:triggers
        };
    }

    //#region Logic

    private parseLogic(node: Node): mTrigger.Trigger[] {
        this.logger.log("parseLogic: " + node.nodeName);
        var triggers: mTrigger.Trigger[] = [];
        var length = node.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = node.childNodes.item(i);
            switch (child.nodeName) {
                case XmlManager.Trigger:
                    triggers.push(this.parseTrigger(child));
                    break;
                case XmlManager.Action:
                    triggers.push(this.parseActionTrigger(child));
                    break;
            }
        }
        return triggers;
    }

    private parseTrigger(node: Node): mTrigger.Trigger {
        var formId: string = node.attributes['form-id'].value;
        var event: string = node.attributes['event'].value;
        this.logger.log("parseTrigger formId=" + formId + " event=" + event);
        var triggerFunc;
        var length = node.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = node.childNodes.item(i);
            var func = this.parseLogicNode(child);
            if (func) {
                triggerFunc = func;
            }
        }
        return new mTrigger.Trigger(formId, event, triggerFunc);
    }


    private parseActionTrigger(node: Node): mTrigger.Trigger {
        var controlId: string = node.attributes['control-id'].value;
        var event: string = mEventManager.EventManager.OnAction;
        this.logger.log("parseTrigger formId=" + controlId + " event=" + event);
        var triggerFunc;
        var length = node.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = node.childNodes.item(i);
            var func = this.parseLogicNode(child);
            if (func) {
                triggerFunc = func;
            }
        }
        return new mTrigger.Trigger(controlId, event, triggerFunc);
    }

    private parseLogicNode(node: Node): Function {
        this.logger.log("parse logic node: " + node.nodeName);
        switch (node.nodeName) {
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
    }

    private parseSeq(node: Node): Function {
        this.logger.log("parseSeq");
        var first: Function;
        var second: Function;
        var length = node.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = node.childNodes.item(i);
            switch (child.nodeName) {
                case XmlManager.SeqFirst:
                    first = this.parseLogicNode(child);
                    break;
                case XmlManager.SeqSecond:
                    second = this.parseLogicNode(child);
                    break;
            }
        }
        return this.logicFunctionFactory.seqFunc(first, second);
    }

    private parseTransition(node: Node): Function {
        this.logger.log("parseTransition");
        var formId: string = node.attributes['form-id'].value;
        return this.logicFunctionFactory.transitionFunc(formId);
    }

    private parseLoginRequest(node: Node): Function {
        this.logger.log("parseLoginRequest");
        var url: string = node.attributes['url'].value;
        var loginId: string = node.attributes['login-id'].value;
        var passwordId: string = node.attributes['password-id'].value;
        return this.logicFunctionFactory.loginRequestFunc(url, loginId, passwordId);
    }
    //#endregion

    //#region Forms
    private parseForms(node: Node): mPage.Page[] {
        var forms: mPage.Page[] = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes.item(i).nodeName == XmlManager.Form) {
                forms.push(this.parseForm(node.childNodes.item(i)));
            }
        }
        return forms;
    }

    private parseForm(node: Node): mPage.Page {
        this.logger.log("parseForm: " + node.nodeName);
        var name: string = node.attributes['form_name'].value;
        var view: mControl.Control = this.parseNode(node.childNodes.item(1));
        return new mPage.Page(name, view);
    }

    private parseNode(node: Node): mControl.Control {
        this.logger.log("parse node: " + node.nodeName);
        var control: mControl.Control;
        switch (node.nodeName) {
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
    }

    private parseLinearLayout(node: Node): mLinearLayout.LinearLayout {
        this.logger.log("parseLinearLayout");
        var tag = new mLinearLayoutTag.LinearLayoutTag();
        this.fillLinearLayoutData(node, tag);

        var linearLayout = new mLinearLayout.LinearLayout(tag);

        var length = node.childNodes.length;
        this.logger.log("parseLinearLayout length: " + length);
        for (var i = 0; i < length; i++) {
            var child = this.parseNode(node.childNodes.item(i));
            if (child) {
                linearLayout.addChild(child);
            }
        }
        return linearLayout;
    }

    private parseTextView(node: Node): mTextView.TextView {
        this.logger.log("parseTextView");
        var tag = new mTextViewTag.TextViewTag();
        this.fillTextViewData(node, tag);
        var textView = new mTextView.TextView(tag);
        return textView;
    }

    private parseInput(node: Node): mInput.Input {
        this.logger.log("parseInput");
        var tag = new mInputTag.InputTag();
        this.fillInputData(node, tag);
        var input = new mInput.Input(tag);
        return input;
    }

    private parseButton(node: Node): mButton.Button {
        this.logger.log("parseButton");
        var tag = new mButtonTag.ButtonTag();
        this.fillButtonData(node, tag);
        var button = new mButton.Button(tag);
        return button;
    }

    private parseImageView(node: Node): mImageView.ImageView {
        this.logger.log("parseImageView");
        var tag = new mImageViewTag.ImageViewTag();
        this.fillImageViewData(node, tag);
        var imageView = new mImageView.ImageView(tag);
        return imageView;
    }

    private parseWebView(node: Node): mWebView.WebView {
        this.logger.log("parseWebView");
        var tag = new mWebViewTag.WebViewTag();
        this.fillWebViewData(node, tag);
        var webView = new mWebView.WebView(tag);
        return webView;
    }

    private parseMap(node: Node): mMap.Map {
        this.logger.log("parseMap");
        var tag = new mMapTag.MapTag();
        this.fillControlTagData(node, tag);
        var map = new mMap.Map(tag);
        return map;
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

    private fillInputData(node: Node, tag: mInputTag.InputTag) {
        this.fillTextViewData(node, tag);
    }

    private fillButtonData(node: Node, tag: mButtonTag.ButtonTag) {
        this.fillTextViewData(node, tag);

        var onClick: Attr = node.attributes['onClick'];
        if (onClick) {
            this.logger.log("onClick: " + onClick.value);
            tag.OnClick = onClick.value;
        }
    }

    private fillImageViewData(node: Node, tag: mImageViewTag.ImageViewTag) {
        this.fillControlTagData(node, tag);
        var src: Attr = node.attributes['src'];
        if (src) {
            this.logger.log("src: " + src.value);
            tag.ImageUrl = src.value;
        }
    }

    private fillWebViewData(node: Node, tag: mWebViewTag.WebViewTag) {
        this.fillControlTagData(node, tag);
        var url: Attr = node.attributes['url'];
        if (url) {
            this.logger.log("url: " + url.value);
            tag.Url = url.value;
        }
    }

    private fillControlPanelData(node: Node, tag: mControlPanelTag.ControlPanelTag) {
        this.fillControlTagData(node, tag);
    }

    private fillControlTagData(node: Node, tag: mControlTag.ControlTag) {
        var id: Attr = node.attributes['id'];
        if (id) {
            this.logger.log("id: " + id.value);
            tag.Id = id.value;
        }

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

        var background: Attr = node.attributes['background'];
        if (background) {
            this.logger.log("background: " + background.value);
            tag.Background = background.value;
        }

        var gravity: Attr = node.attributes['gravity'];
        if (gravity) {
            this.logger.log("gravity: " + gravity.value);
            tag.Gravity = gravity.value;
        }

        var layout_marginTop: Attr = node.attributes['layout_marginTop'];
        if (layout_marginTop) {
            this.logger.log("layout_marginTop: " + layout_marginTop.value);
            tag.MarginTop = parseInt(layout_marginTop.value);
        }

        var layout_marginBottom: Attr = node.attributes['layout_marginBottom'];
        if (layout_marginBottom) {
            this.logger.log("layout_marginBottom: " + layout_marginBottom.value);
            tag.MarginBottom = parseInt(layout_marginBottom.value);
        }

        var layout_marginLeft: Attr = node.attributes['layout_marginLeft'];
        if (layout_marginLeft) {
            this.logger.log("layout_marginLeft: " + layout_marginLeft.value);
            tag.MarginLeft = parseInt(layout_marginLeft.value);
        }

        var layout_marginRight: Attr = node.attributes['layout_marginRight'];
        if (layout_marginRight) {
            this.logger.log("layout_marginRight: " + layout_marginRight.value);
            tag.MarginRight = parseInt(layout_marginRight.value);
        }
    }
    //#endregion
}