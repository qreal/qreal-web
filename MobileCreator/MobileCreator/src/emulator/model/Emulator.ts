/// <reference path="../../../lib/jquery.d.ts" />
//#region Imports
import mLog = module("utils/log/Log");
import mXmlHelper = module("utils/XmlHelper");
import mPage = module("emulator/model/Page");
import mButton = module("emulator/model/ui/Button");
import mControl = module("emulator/model/ui/Control");
import mTextView = module("emulator/model/ui/TextView");
import mLinearLayout = module("emulator/model/ui/LinearLayout");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");
import mImageViewTag = module("emulator/model/attributes/ImageViewTag");
import mImageView = module("emulator/model/ui/ImageView");
import mWebView = module("emulator/model/ui/WebView");
import mWebViewTag = module("emulator/model/attributes/WebViewTag");

//ViewModels
import mEmulatorViewModel = module("emulator/viewmodel/EmulatorViewModel");

//Managers
import mNavigationManager = module("emulator/model/managers/NavigationManager");
import mXmlManager = module("emulator/model/managers/XmlManager");

//Logic
import mTrigger = module("emulator/model/logic/Trigger");
import mLogic = module("emulator/model/logic/Logic");
//#endregion

export class Emulator {

    public static instance = new Emulator();

    private logger = new mLog.Logger("Emulator");
    private emulatorViewModel: mEmulatorViewModel.EmulatorViewModel;
    private navigationManager: mNavigationManager.NavigationManager;
    private xmlManager: mXmlManager.XmlManager;

    constructor() {
        this.logger.log("constructor");
        this.emulatorViewModel = new mEmulatorViewModel.EmulatorViewModel();
        this.navigationManager = new mNavigationManager.NavigationManager();
        this.xmlManager = new mXmlManager.XmlManager();
        $("#back_button").bind('click', () => this.navigationManager.back());
    }

    public showXmlStringView(xml: string) {
        this.logger.log("showXmlStringView: \n" + xml);
        this.clearUi();
        xml = mXmlHelper.escapeXml(xml);
        var pages: mPage.Page[] = this.xmlManager.parseXmlString(xml);
        pages.map(page => this.addPage(page));

        //TODO: test stub
        pages.map(function (page: mPage.Page) {
            var onShowTrigger = new mTrigger.Trigger(mTrigger.Trigger.OnShow, function () {
                console.log("OnShow Trigger");
            });
            page.addTrigger(onShowTrigger);

            var onTimerTrigger = new mTrigger.Trigger(mTrigger.Trigger.OnTimer, function () {
                console.log("onTimer Trigger");
            });
            page.addTrigger(onTimerTrigger);
        });
        //end stub
        this.navigationManager.showPage(pages[0].Name);
    }

    private addPage(page: mPage.Page) {
        this.navigationManager.addPage(page);
        this.emulatorViewModel.addView(page.Root);
    }

    public showPage(page: mControl.Control) {
        this.emulatorViewModel.showView(page);
    }

    get NavigationManager() {
        return this.navigationManager;
    }

    private clearUi() {
        this.navigationManager.clear();
        this.emulatorViewModel.clear();
    }
}