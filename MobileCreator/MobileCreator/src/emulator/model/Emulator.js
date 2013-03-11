define(["require", "exports", "utils/log/Log", "emulator/model/ui/Button", "emulator/model/ui/TextView", "emulator/model/ui/LinearLayout", "emulator/model/attributes/ButtonTag", "emulator/model/attributes/LinearLayoutTag", "emulator/model/attributes/TextViewTag", "emulator/model/attributes/ImageViewTag", "emulator/model/ui/ImageView", "emulator/model/ui/WebView", "emulator/model/attributes/WebViewTag", "emulator/viewmodel/EmulatorViewModel", "emulator/model/managers/NavigationManager", "emulator/model/managers/XmlManager"], function(require, exports, __mLog__, __mButton__, __mTextView__, __mLinearLayout__, __mButtonTag__, __mLinearLayoutTag__, __mTextViewTag__, __mImageViewTag__, __mImageView__, __mWebView__, __mWebViewTag__, __mEmulatorViewModel__, __mNavigationManager__, __mXmlManager__) {
    var mLog = __mLog__;

    var mButton = __mButton__;

    var mTextView = __mTextView__;

    var mLinearLayout = __mLinearLayout__;

    var mButtonTag = __mButtonTag__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var mTextViewTag = __mTextViewTag__;

    var mImageViewTag = __mImageViewTag__;

    var mImageView = __mImageView__;

    var mWebView = __mWebView__;

    var mWebViewTag = __mWebViewTag__;

    var mEmulatorViewModel = __mEmulatorViewModel__;

    var mNavigationManager = __mNavigationManager__;

    var mXmlManager = __mXmlManager__;

    var Emulator = (function () {
        function Emulator() {
            this.logger = new mLog.Logger("Emulator");
            this.logger.log("constructor");
            this.emulatorViewModel = new mEmulatorViewModel.EmulatorViewModel();
            this.navigationManager = new mNavigationManager.NavigationManager();
            this.xmlManager = new mXmlManager.XmlManager();
        }
        Emulator.instance = new Emulator();
        Emulator.prototype.createView = function () {
            this.logger.log("createView");
            var page1 = this.showVisitCard();
            var page2 = this.showTestStub();
            var xmlPage = this.xmlManager.parsePage();
            this.navigationManager.addPage("page1", page1);
            this.navigationManager.addPage("page2", page2);
            this.navigationManager.addPage("xmlPage", xmlPage);
            this.emulatorViewModel.showView(this.navigationManager.getPage("xmlPage"));
        };
        Emulator.prototype.showView = function (xmlString) {
            this.logger.log("showView: \n" + xmlString);
            var xmlPage = this.xmlManager.parseXmlString(xmlString);
            this.navigationManager.addPage("page1", xmlPage);
            this.emulatorViewModel.showView(this.navigationManager.getPage("page1"));
        };
        Emulator.prototype.showTestStub = function () {
            var layoutTag = new mLinearLayoutTag.LinearLayoutTag();
            layoutTag.Id = "linear";
            layoutTag.Orientation = mLinearLayoutTag.LinearLayoutTag.Vertical;
            layoutTag.Background = "#e3e3e3";
            layoutTag.Width = -1;
            layoutTag.Height = -1;
            var layout = new mLinearLayout.LinearLayout(layoutTag);
            var webViewTag = new mWebViewTag.WebViewTag();
            webViewTag.Id = "webView";
            webViewTag.Url = "http://www.lanit-tercom.ru/";
            webViewTag.Width = -1;
            webViewTag.Height = -1;
            var webView = new mWebView.WebView(webViewTag);
            layout.addChild(webView);
            return layout;
        };
        Emulator.prototype.showVisitCard = function () {
            var layoutTag = new mLinearLayoutTag.LinearLayoutTag();
            layoutTag.Id = "linear";
            layoutTag.Orientation = mLinearLayoutTag.LinearLayoutTag.Vertical;
            layoutTag.Background = "#e3e3e3";
            layoutTag.Width = -1;
            layoutTag.Height = -1;
            var layout = new mLinearLayout.LinearLayout(layoutTag);
            var innerLayoutTag = new mLinearLayoutTag.LinearLayoutTag();
            innerLayoutTag.Id = "innerLinear";
            innerLayoutTag.Orientation = mLinearLayoutTag.LinearLayoutTag.Vertical;
            innerLayoutTag.Background = "#e3e3e3";
            innerLayoutTag.MarginLeft = 20;
            innerLayoutTag.MarginRight = 20;
            var innerLayout = new mLinearLayout.LinearLayout(innerLayoutTag);
            var logoTag = new mImageViewTag.ImageViewTag();
            logoTag.Id = "logo";
            logoTag.ImageUrl = "https://dl.dropbox.com/u/10802739/lt_logo.jpg";
            logoTag.Width = 300;
            logoTag.Height = 120;
            logoTag.Gravity = "center";
            logoTag.MarginTop = 30;
            var logo = new mImageView.ImageView(logoTag);
            var infoLabelTag = new mTextViewTag.TextViewTag();
            infoLabelTag.Id = "info";
            infoLabelTag.Text = "LANIT-TERCOM is one of the few Russian IT companies which are able not only to fulfil industrial contracts, but also to carry out challenging science-intensive programming projects.";
            infoLabelTag.MarginTop = 20;
            var label1 = new mTextView.TextView(infoLabelTag);
            var buttonTag = new mButtonTag.ButtonTag();
            buttonTag.Id = "button";
            buttonTag.Text = "Show more";
            buttonTag.MarginTop = 320;
            var button = new mButton.Button(buttonTag);
            innerLayout.addChild(logo);
            innerLayout.addChild(label1);
            innerLayout.addChild(button);
            layout.addChild(innerLayout);
            return layout;
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})
