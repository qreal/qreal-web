define(["require", "exports", "utils/log/Log", "emulator/model/logic/Trigger"], function(require, exports, __mLog__, __mTrigger__) {
    var mLog = __mLog__;

    var mTrigger = __mTrigger__;

    
    
    
    
    
    
    
    
    
    
    
    
    var Page = (function () {
        function Page(name, root) {
            this.triggers = [];
            Page.logger.log("Constructor name: " + name);
            this.name = name;
            this.root = root;
        }
        Page.logger = new mLog.Logger("Page");
        Page.prototype.onShow = function () {
            var _this = this;
            this.trigger(mTrigger.Trigger.OnShow);
            this.timerToken = setInterval(function () {
                return _this.trigger(mTrigger.Trigger.OnTimer);
            }, 5000);
        };
        Page.prototype.onHide = function () {
            clearTimeout(this.timerToken);
        };
        Page.prototype.addTrigger = function (trigger) {
            Page.logger.log("addTrigger: " + trigger.Event);
            this.triggers.push(trigger);
        };
        Page.prototype.trigger = function (event) {
            Page.logger.log("trigger: " + event);
            this.triggers.forEach(function (trigger, index, array) {
                if(trigger.Event == event) {
                    trigger.Trigger(this);
                }
            });
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
