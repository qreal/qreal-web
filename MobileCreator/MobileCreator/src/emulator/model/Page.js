define(["require", "exports", "utils/log/Log", "emulator/model/Emulator", "emulator/model/managers/EventManager"], function(require, exports, __mLog__, __mEmulator__, __mEventManager__) {
    var mLog = __mLog__;

    var mEmulator = __mEmulator__;

    var mEventManager = __mEventManager__;

    
    
    
    
    
    
    
    
    
    
    
    
    var Page = (function () {
        function Page(name, root) {
            Page.logger.log("Constructor name: " + name);
            this.name = name;
            this.root = root;
        }
        Page.logger = new mLog.Logger("Page");
        Page.prototype.onShow = function () {
            mEmulator.Emulator.instance.EventManager.trigger(name, mEventManager.EventManager.OnShow);
            this.timerToken = setInterval(function () {
                return mEmulator.Emulator.instance.EventManager.trigger(name, mEventManager.EventManager.OnTimer);
            }, 10000);
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
})
//@ sourceMappingURL=Page.js.map
