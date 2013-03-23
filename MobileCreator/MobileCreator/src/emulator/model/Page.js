define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    
    
    
    
    
    
    
    
    
    
    
    var Page = (function () {
        function Page(name, root, onShowFunction) {
            Page.logger.log("Constructor name: " + name);
            this.name = name;
            this.root = root;
            this.onShowFunction = onShowFunction;
        }
        Page.logger = new mLog.Logger("Page");
        Page.prototype.onShow = function () {
            Page.logger;
            if(this.onShowFunction) {
                this.onShowFunction();
            }
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
