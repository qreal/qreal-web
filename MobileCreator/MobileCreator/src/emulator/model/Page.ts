//#region Imports
import mLog = module("utils/log/Log");
import mEmulator = module("emulator/model/Emulator");
import mEventManager = module("emulator/model/managers/EventManager");
import mXmlHelper = module("utils/XmlHelper");
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
//#endregion

export class Page {
    private static logger = new mLog.Logger("Page");

    private root: mControl.Control;
    private name: string;
    private timerToken: number;

    constructor(name: string, root: mControl.Control) {
        Page.logger.log("Constructor name: " + name);
        this.name = name;
        this.root = root;
    }

    public onShow(): void {
        mEmulator.Emulator.instance.EventManager.trigger(name, mEventManager.EventManager.OnShow);
        this.timerToken = setInterval(() =>
            mEmulator.Emulator.instance.EventManager.trigger(name, mEventManager.EventManager.OnTimer), 10000);
    }

    public onHide(): void {
        clearTimeout(this.timerToken);
    }

    get Root(): mControl.Control {
        return this.root;
    }

    get Name(): string {
        return this.name;
    }
}