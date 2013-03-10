import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");

export class NavigationManager {
    private logger = new mLog.Logger("NavigationManager");

    private pageStack: mControl.Control[] = [];

    constructor() {
    }

    public showView(view: mControl.Control) {
    }

    public back() {
    }

}