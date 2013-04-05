var mLog = require("./utils/log/Log")
var mEmulator = require("./emulator/model/Emulator")
var mEventManager = require("./emulator/model/managers/EventManager")












var Page = (function () {
    function Page(name, root) {
        Page.logger.log("Constructor name: " + name);
        this.name = name;
        this.root = root;
    }
    Page.logger = new mLog.Logger("Page");
    Page.prototype.onShow = function () {
        var _this = this;
        Page.logger.log("onShow");
        mEmulator.Emulator.instance.EventManager.trigger(this.Name, mEventManager.EventManager.OnShow);
        mEmulator.Emulator.instance.EventManager.trigger(this.Name, mEventManager.EventManager.OnTimer);
        this.timerToken = setInterval(function () {
            return mEmulator.Emulator.instance.EventManager.trigger(_this.Name, mEventManager.EventManager.OnTimer);
        }, 2000);
    };
    Page.prototype.onHide = function () {
        clearTimeout(this.timerToken);
    };
    Object.defineProperty(Page.prototype, "Root", {
        get: function () {
            return this.root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return Page;
})();
exports.Page = Page;
//@ sourceMappingURL=Page.js.map
