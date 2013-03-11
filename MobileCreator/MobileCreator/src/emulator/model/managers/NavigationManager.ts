import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");

export class NavigationManager {
    private logger = new mLog.Logger("NavigationManager");

    private pageStack: mControl.Control[] = [];
    private pages: mControl.Control[] = [];

    constructor() {
        this.logger.log("in constructor");
    }

    public addPage(pageId: string, page: mControl.Control) {
        this.pages[pageId] = page;
    }

    public getPage(pageId: string) {
        var page = this.pages[pageId];
        this.pageStack.push(page);
        return page;
    }

    public back() {
        return this.pageStack.pop();
    }
}