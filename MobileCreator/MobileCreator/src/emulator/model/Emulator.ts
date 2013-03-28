/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/bing/Microsoft.Maps.d.ts" />
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
import mEventManager = module("emulator/model/managers/EventManager");

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
    private eventManager: mEventManager.EventManager;

    constructor() {
        this.logger.log("constructor");
        this.emulatorViewModel = new mEmulatorViewModel.EmulatorViewModel();
        this.navigationManager = new mNavigationManager.NavigationManager();
        this.xmlManager = new mXmlManager.XmlManager();
        this.eventManager = new mEventManager.EventManager();
        $("#back_button").bind('click', () => this.navigationManager.back());
    }

    public showXmlStringView(xml: string) {
        this.logger.log("showXmlStringView: \n" + xml);
        this.clearUi();
        xml = mXmlHelper.escapeXml(xml);
        var application = this.xmlManager.parseXmlString(xml);
        //var application = this.xmlManager.parseStoredXml('/res/application5.xml');
        var pages = application.pages;
        var triggers = application.triggers;
        var _eventManager = this.eventManager;
        triggers.map(trigger => this.eventManager.addTrigger(trigger));
        pages.map(page => this.addPage(page));
        this.navigationManager.showPage(pages[0].Name);
    }

    private addPage(page: mPage.Page) {
        this.navigationManager.addPage(page);
        this.emulatorViewModel.addView(page.Root);
    }

    public showPage(page: mControl.Control) {
        this.emulatorViewModel.showView(page);
    }

    get NavigationManager(): mNavigationManager.NavigationManager {
        return this.navigationManager;
    }

    get EmulatorViewModel(): mEmulatorViewModel.EmulatorViewModel {
        return this.emulatorViewModel;
    }

    get EventManager(): mEventManager.EventManager {
        return this.eventManager;
    }

    private clearUi() {
        this.navigationManager.clear();
        this.emulatorViewModel.clear();
        this.eventManager.clear();
    }
}