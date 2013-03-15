/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mElement = module("designer/widgets/Element");
import mElementPreferences = module("designer/preferences/ElementPreferences")
import mLinearLayoutPreferences = module("designer/preferences/LinearLayoutPreferences")
import mWidgetTypes = module("designer/widgets/WidgetTypes")
import mButtonPreferences = module("designer/preferences/ButtonPreferences");
import mButton = module("designer/widgets/Button");
import mDesigner = module("designer/Designer")
import mTextViewPreferences = module("designer/preferences/TextViewPreferences");
import mTextView = module("designer/widgets/TextView");
import mImageViewPreferences = module("designer/preferences/ImageViewPreferences");
import mImageView = module("designer/widgets/ImageView");
import mWebViewPreferences = module("designer/preferences/WebViewPreference");
import mWebView = module("designer/widgets/WebView");

export class LinearLayout extends mElement.Element {
    private preferences: mLinearLayoutPreferences.LinearLayoutPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mLinearLayoutPreferences.LinearLayoutPreferences) {
        this.preferences = preferences;
    }
    private children: mElement.Element[] = [];
    get Children() {
        return this.children;
    }
    set Children(children: mElement.Element[]) {
        this.children = children;
    }
    public addChild(child: mElement.Element) {
        this.children.push(child);
        this.DomElement.append(child.DomElement);
    }
    public removeChild(child: mElement.Element) {
        var indexToDel = -1;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].Preferences.Id == child.Preferences.Id) {
                indexToDel = i;
                break;
            }
        }
        this.children.splice(indexToDel, 1);
    }
    constructor(preferences: mLinearLayoutPreferences.LinearLayoutPreferences);
    constructor(preferences: mLinearLayoutPreferences.LinearLayoutPreferences, domElement: JQuery);
    constructor(preferences: mLinearLayoutPreferences.LinearLayoutPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
        var _this = this;
        var domHTML = <HTMLElement> this.DomElement.get(0);
        domHTML.ondragover = function (ev: DragEvent) {
            ev.preventDefault();
        }
        domHTML.ondrop = function (ev: DragEvent) {
            ev.preventDefault();
            var WidgetType = ev.dataTransfer.getData("WidgetType");
            var isNew = ev.dataTransfer.getData("IsNew");
            if (isNew == "yes") {
                var widgetType = parseInt(ev.dataTransfer.getData("WidgetType"));
                switch (widgetType) {
                    case mWidgetTypes.WidgetTypes.Button:
                        var buttonPreferences = new mButtonPreferences.ButtonPreferences();
                        buttonPreferences.ButtonId = "buttone" + mDesigner.Designer.id;
                        buttonPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
                        buttonPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        buttonPreferences.LayoutMarginTop = 20;
                        buttonPreferences.OnClickHandler = "main";
                        buttonPreferences.Text = "Button";
                        buttonPreferences.TextSize = 15;
                        buttonPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        var button = new mButton.Button(buttonPreferences);
                        _this.addChild(button);
                        button.init();
                        break;
                    case mWidgetTypes.WidgetTypes.TextView:
                        var textViewPreferences = new mTextViewPreferences.TextViewPreferences();
                        textViewPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
                        textViewPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        textViewPreferences.LayoutMarginTop = 10;
                        textViewPreferences.Padding = 10;
                        textViewPreferences.Text = "TextView";
                        textViewPreferences.TextSize = 26;
                        textViewPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        var textView = new mTextView.TextView(textViewPreferences);
                        _this.addChild(textView);
                        textView.init();
                        break;
                    case mWidgetTypes.WidgetTypes.ImageView:
                        var imageViewPreferences = new mImageViewPreferences.ImageViewPreferences();
                        imageViewPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
                        imageViewPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        imageViewPreferences.LayoutGravity = "center_horizontal";
                        imageViewPreferences.LayoutMarginTop = 10;
                        imageViewPreferences.Width = mElementPreferences.ElementPreferences.WrapContent;
                        //imageViewPreferences.Src = "https://dl.dropbox.com/u/10802739/lt_logo.jpg";
                        imageViewPreferences.Src = "res/imageview.png";
                        var imageView = new mImageView.ImageView(imageViewPreferences);
                        _this.addChild(imageView);
                        imageView.init();
                        break;
                    case mWidgetTypes.WidgetTypes.WebView:
                        var webViewPreferences = new mWebViewPreferences.WebViewPreferences();
                        webViewPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
                        webViewPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        webViewPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        webViewPreferences.Url = "";
                        var webView = new mWebView.WebView(webViewPreferences);
                        _this.addChild(webView);
                        webView.init();
                        break;
                }
            }
            
        }
    }
    public init() {
        this.children.map(function (child) { child.init(); });
        this.applyHeight();
        this.applyWidth();
    }
    public toXML() {
        var xmlString = "";
        xmlString += "<LinearLayout \n";
        xmlString += "xmlns=\"http://schemas.android.com/apk/res/android\" \n";
        if (this.preferences.Orientation == mLinearLayoutPreferences.LinearLayoutPreferences.Horizontal) {
            xmlString += "orientation=\"horizontal\" ";
        } else {
            xmlString += "orientation=\"vertical\" ";
        }
        if (this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_width=\"fill_parent\" ";
        } else if (this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_width=\"wrap_content\" ";
        } else {
            xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
        }
        if (this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_height=\"fill_parent\" ";
        } else if (this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_height=\"wrap_content\" ";
        } else {
            xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
        }
        xmlString += "background=\"" + this.preferences.Background + "\"> \n"
        for (var i = 0; i < this.children.length; i++) {
            xmlString += this.children[i].toXML();
        }
        xmlString += "</LinearLayout>\n"
        return xmlString;
    }
}