var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/widgets/Element", "designer/preferences/ElementPreferences", "designer/preferences/LinearLayoutPreferences", "designer/widgets/WidgetTypes", "designer/preferences/ButtonPreferences", "designer/widgets/Button", "designer/Designer", "designer/preferences/TextViewPreferences", "designer/widgets/TextView", "designer/preferences/ImageViewPreferences", "designer/widgets/ImageView", "designer/preferences/WebViewPreference", "designer/widgets/WebView"], function(require, exports, __mElement__, __mElementPreferences__, __mLinearLayoutPreferences__, __mWidgetTypes__, __mButtonPreferences__, __mButton__, __mDesigner__, __mTextViewPreferences__, __mTextView__, __mImageViewPreferences__, __mImageView__, __mWebViewPreferences__, __mWebView__) {
    var mElement = __mElement__;

    var mElementPreferences = __mElementPreferences__;

    var mLinearLayoutPreferences = __mLinearLayoutPreferences__;

    var mWidgetTypes = __mWidgetTypes__;

    var mButtonPreferences = __mButtonPreferences__;

    var mButton = __mButton__;

    var mDesigner = __mDesigner__;

    var mTextViewPreferences = __mTextViewPreferences__;

    var mTextView = __mTextView__;

    var mImageViewPreferences = __mImageViewPreferences__;

    var mImageView = __mImageView__;

    var mWebViewPreferences = __mWebViewPreferences__;

    var mWebView = __mWebView__;

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
            xmlString += "xmlns=\"http://schemas.android.com/apk/res/android\" \n";
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
})
