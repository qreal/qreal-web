//#region Imports
import mLog = module("utils/log/Log");
import mTrigger = module("emulator/model/logic/Trigger");
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
    private onShowFunction;

    constructor(name: string, root: mControl.Control, onShowFunction?) {
        Page.logger.log("Constructor name: " + name);
        this.name = name;
        this.root = root;
        this.onShowFunction = onShowFunction;
    }

    private triggers: mTrigger.Trigger[] = [];
    public addTrigger(trigger: mTrigger.Trigger) {
        Page.logger.log("addTrigger: " + trigger.Event);
        this.triggers.push(trigger);
    }

    public trigger(event: string) {
        Page.logger.log("trigger: "+event);
        this.triggers.forEach(function (trigger: mTrigger.Trigger, index: number, array: mTrigger.Trigger[]) {
            if (trigger.Event == event) {
                trigger.Trigger(this);
            }
        });
    }

    get Root(): mControl.Control {
        return this.root;
    }

    get Name(): string {
        return this.name;
    }
}