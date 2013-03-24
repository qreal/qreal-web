import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");
import mPage = module("emulator/model/Page");
import mEmulator = module("emulator/model/Emulator");
import mTrigger = module("emulator/model/logic/Trigger");

export class NavigationManager {
    private static logger = new mLog.Logger("NavigationManager");
    private idPreffix = "PageId_";

    private pageStack: string[] = [];
    private pages: mPage.Page[] = [];

    constructor() {
        NavigationManager.logger.log("in constructor");
    }

    public addPage(page: mPage.Page) {
        this.pages[this.idPreffix + page.Name] = page;
    }

    public showPage(pageName: string) {
        NavigationManager.logger.log("showPage "+pageName);
        var page:mPage.Page = this.pages[this.idPreffix + pageName];
        this.pageStack.push(this.idPreffix + pageName);
        mEmulator.Emulator.instance.showPage(page.Root);
        page.trigger(mTrigger.Trigger.OnShow);
    }

    public back() {
        var length = this.pageStack.length;
        if (length > 1) {
            this.pageStack.splice(length - 1, 1);
            var pageId = this.pageStack[this.pageStack.length - 1];
            mEmulator.Emulator.instance.showPage(this.pages[pageId].Root);
        }
    }

    public clear() {
        this.pageStack = [];
        this.pages = [];
    }
}