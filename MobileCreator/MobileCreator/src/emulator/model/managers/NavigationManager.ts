import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");
import mEmulator = module("emulator/model/Emulator");

export class NavigationManager {
    private logger = new mLog.Logger("NavigationManager");
    private idPreffix = "PageId_";

    private pageStack: string[] = [];
    private pages: mControl.Control[] = [];

    constructor() {
        this.logger.log("in constructor");
    }

    public addPage(pageId: string, page: mControl.Control) {
        this.pages[this.idPreffix + pageId] = page;
    }

    public showPage(pageId: string) {
        var page = this.pages[this.idPreffix + pageId];
        this.pageStack.push(this.idPreffix + pageId);
        mEmulator.Emulator.instance.showPage(page);
    }

    public back() {
        var length = this.pageStack.length;
        if (length > 1) {
            this.pageStack.splice(length - 1, 1);
            var pageId = this.pageStack[this.pageStack.length - 1];
            mEmulator.Emulator.instance.showPage(this.pages[pageId]);
        }
    }

    public clear() {
        this.pageStack = [];
        this.pages = [];
    }
}