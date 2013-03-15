import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");

export class NavigationManager {
    private logger = new mLog.Logger("NavigationManager");

    private pageStack: string[] = [];
    private pages: mControl.Control[] = [];

    constructor() {
        this.logger.log("in constructor");
    }

    public addPage(pageId: string, page: mControl.Control) {
        this.pages[pageId] = page;
    }

    public getPage(pageId: string) {
        var page = this.pages[pageId];
        this.pageStack.push(pageId);
        return page;
    }

    public back() {
        if (this.pageStack.length > 1) {
            this.pageStack.pop();
            return this.pageStack[this.pageStack.length - 1];
        }
        return undefined;
    }
}