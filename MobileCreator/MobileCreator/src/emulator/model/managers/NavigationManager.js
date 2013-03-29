define(["require", "exports", "utils/log/Log", "emulator/model/Emulator"], function(require, exports, __mLog__, __mEmulator__) {
    var mLog = __mLog__;

    
    
    var mEmulator = __mEmulator__;

    
    var NavigationManager = (function () {
        function NavigationManager() {
            this.idPreffix = "PageId_";
            this.pageStack = [];
            this.pages = [];
            NavigationManager.logger.log("in constructor");
        }
        NavigationManager.logger = new mLog.Logger("NavigationManager");
        Object.defineProperty(NavigationManager.prototype, "CurrentPage", {
            get: function () {
                return this.currentPage;
            },
            enumerable: true,
            configurable: true
        });
        NavigationManager.prototype.addPage = function (page) {
            this.pages[this.idPreffix + page.Name] = page;
        };
        NavigationManager.prototype.showPage = function (pageName) {
            NavigationManager.logger.log("showPage " + pageName);
            var page = this.pages[this.idPreffix + pageName];
            this.pageStack.push(this.idPreffix + pageName);
            mEmulator.Emulator.instance.showPage(page.Root);
            if(this.currentPage) {
                this.currentPage.onHide();
            }
            page.onShow();
            this.currentPage = page;
        };
        NavigationManager.prototype.back = function () {
            var length = this.pageStack.length;
            if(length > 1) {
                this.pageStack.splice(length - 1, 1);
                var pageId = this.pageStack[this.pageStack.length - 1];
                mEmulator.Emulator.instance.showPage(this.pages[pageId].Root);
            }
        };
        NavigationManager.prototype.clear = function () {
            this.pageStack = [];
            this.pages = [];
            if(this.currentPage) {
                this.currentPage.onHide();
            }
            this.currentPage = undefined;
        };
        return NavigationManager;
    })();
    exports.NavigationManager = NavigationManager;    
})
//@ sourceMappingURL=NavigationManager.js.map
