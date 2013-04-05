var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mElement = require("./designer/widgets/Element")
var mElementPreferences = require("./designer/preferences/ElementPreferences")
var mLinearLayoutPreferences = require("./designer/preferences/LinearLayoutPreferences")
var mWidgetTypes = require("./designer/widgets/WidgetTypes")
var mButtonPreferences = require("./designer/preferences/ButtonPreferences")
var mButton = require("./designer/widgets/Button")
var mDesigner = require("./designer/Designer")
var mTextViewPreferences = require("./designer/preferences/TextViewPreferences")
var mTextView = require("./designer/widgets/TextView")
var mImageViewPreferences = require("./designer/preferences/ImageViewPreferences")
var mImageView = require("./designer/widgets/ImageView")
var mWebViewPreferences = require("./designer/preferences/WebViewPreference")
var mWebView = require("./designer/widgets/WebView")
var mEditTextPreferences = require("./designer/preferences/EditTextPreferences")
var mEditText = require("./designer/widgets/EditText")
var mMapPreferences = require("./designer/preferences/MapPreferences")
var mMap = require("./designer/widgets/Map")
var LinearLayout = (function (_super) {
    __extends(LinearLayout, _super);
    function LinearLayout(preferences, domElement) {
        if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
        _super.call(this, domElement);
        this.children = [];
        this.Preferences = preferences;
        this.init();
        var _this = this;
        var domHTML = this.DomElement.get(0);
        domHTML.ondragover = function (ev) {
            ev.preventDefault();
        };
        domHTML.ondrop = function (ev) {
            ev.preventDefault();
            var WidgetType = ev.dataTransfer.getData("WidgetType");
            var isNew = ev.dataTransfer.getData("IsNew");
            if(isNew == "yes") {
                var widgetType = parseInt(ev.dataTransfer.getData("WidgetType"));
                switch(widgetType) {
                    case mWidgetTypes.WidgetTypes.Button:
                        var buttonPreferences = new mButtonPreferences.ButtonPreferences();
                        buttonPreferences.WidgetType = mWidgetTypes.WidgetTypes.Button;
                        buttonPreferences.ButtonId = "button" + mDesigner.Designer.id;
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
                        textViewPreferences.WidgetType = mWidgetTypes.WidgetTypes.TextView;
                        textViewPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
                        textViewPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        textViewPreferences.LayoutMarginTop = 10;
                        textViewPreferences.Padding = 0;
                        textViewPreferences.Text = "TextView";
                        textViewPreferences.TextSize = 26;
                        textViewPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        var textView = new mTextView.TextView(textViewPreferences);
                        _this.addChild(textView);
                        textView.init();
                        break;
                    case mWidgetTypes.WidgetTypes.ImageView:
                        var imageViewPreferences = new mImageViewPreferences.ImageViewPreferences();
                        imageViewPreferences.WidgetType = mWidgetTypes.WidgetTypes.ImageView;
                        imageViewPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
                        imageViewPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        imageViewPreferences.LayoutGravity = "center_horizontal";
                        imageViewPreferences.LayoutMarginTop = 10;
                        imageViewPreferences.Width = mElementPreferences.ElementPreferences.WrapContent;
                        imageViewPreferences.Src = "images/imageview.png";
                        var imageView = new mImageView.ImageView(imageViewPreferences);
                        _this.addChild(imageView);
                        imageView.init();
                        break;
                    case mWidgetTypes.WidgetTypes.WebView:
                        var webViewPreferences = new mWebViewPreferences.WebViewPreferences();
                        webViewPreferences.WidgetType = mWidgetTypes.WidgetTypes.WebView;
                        webViewPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
                        webViewPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        webViewPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        webViewPreferences.WebViewId = "webview" + webViewPreferences.Id;
                        webViewPreferences.Url = "";
                        var webView = new mWebView.WebView(webViewPreferences);
                        _this.addChild(webView);
                        webView.init();
                        break;
                    case mWidgetTypes.WidgetTypes.EditText:
                        var editTextPreferences = new mEditTextPreferences.EditTextPreferences();
                        editTextPreferences.WidgetType = mWidgetTypes.WidgetTypes.EditText;
                        editTextPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
                        editTextPreferences.Id = mDesigner.Designer.id;
                        editTextPreferences.EditTextId = "editText" + editTextPreferences.Id;
                        mDesigner.Designer.id++;
                        editTextPreferences.LayoutMarginTop = 10;
                        editTextPreferences.Padding = 0;
                        editTextPreferences.Text = "";
                        editTextPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        var editText = new mEditText.EditText(editTextPreferences);
                        _this.addChild(editText);
                        editText.init();
                        break;
                    case mWidgetTypes.WidgetTypes.Map:
                        var mapPreferences = new mMapPreferences.MapPreferences();
                        mapPreferences.WidgetType = mWidgetTypes.WidgetTypes.Map;
                        mapPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
                        mapPreferences.Id = mDesigner.Designer.id;
                        mDesigner.Designer.id++;
                        mapPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
                        mapPreferences.MapId = "map" + mapPreferences.Id;
                        var map = new mMap.Map(mapPreferences);
                        _this.addChild(map);
                        map.init();
                        break;
                }
            }
        };
    }
    Object.defineProperty(LinearLayout.prototype, "Preferences", {
        get: function () {
            return this.preferences;
        },
        set: function (preferences) {
            this.preferences = preferences;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearLayout.prototype, "Children", {
        get: function () {
            return this.children;
        },
        set: function (children) {
            this.children = children;
        },
        enumerable: true,
        configurable: true
    });
    LinearLayout.prototype.addChild = function (child) {
        this.children.push(child);
        this.DomElement.append(child.DomElement);
    };
    LinearLayout.prototype.removeChild = function (child) {
        var indexToDel = -1;
        for(var i = 0; i < this.children.length; i++) {
            if(this.children[i].Preferences.Id == child.Preferences.Id) {
                indexToDel = i;
                break;
            }
        }
        this.children.splice(indexToDel, 1);
    };
    LinearLayout.prototype.init = function () {
        this.children.map(function (child) {
            child.init();
        });
        this.applyHeight();
        this.applyWidth();
    };
    LinearLayout.prototype.toXML = function () {
        var xmlString = "";
        xmlString += "<LinearLayout \n";
        if(this.preferences.Orientation == mLinearLayoutPreferences.LinearLayoutPreferences.Horizontal) {
            xmlString += "orientation=\"horizontal\" ";
        } else {
            xmlString += "orientation=\"vertical\" ";
        }
        if(this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_width=\"fill_parent\" ";
        } else if(this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_width=\"wrap_content\" ";
        } else {
            xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
        }
        if(this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_height=\"fill_parent\" ";
        } else if(this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_height=\"wrap_content\" ";
        } else {
            xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
        }
        xmlString += "background=\"" + this.preferences.Background + "\"> \n";
        for(var i = 0; i < this.children.length; i++) {
            xmlString += this.children[i].toXML();
        }
        xmlString += "</LinearLayout>\n";
        return xmlString;
    };
    return LinearLayout;
})(mElement.Element);
exports.LinearLayout = LinearLayout;
//@ sourceMappingURL=LinearLayout.js.map
