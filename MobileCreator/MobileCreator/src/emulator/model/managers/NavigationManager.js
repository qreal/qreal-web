define(["require", "exports", "utils/log/Log", "emulator/model/Emulator"], function(require, exports, __mLog__, __mEmulator__) {
    var mLog = __mLog__;

    
    var mEmulator = __mEmulator__;

    var NavigationManager = (function () {
        function NavigationManager() {
            this.logger = new mLog.Logger("NavigationManager");
            this.idPreffix = "PageId_";
            this.pageStack = [];
            this.pages = [];
            this.logger.log("in constructor");
        }
        NavigationManager.prototype.addPage = function (pageId, page) {
            this.pages[this.idPreffix + pageId] = page;
        };
        NavigationManager.prototype.showPage = function (pageId) {
            var page = this.pages[this.idPreffix + pageId];
            this.pageStack.push(this.idPreffix + pageId);
            mEmulator.Emulator.instance.showPage(page);
        };
        NavigationManager.prototype.back = function () {
            var length = this.pageStack.length;
            if(length > 1) {
                this.pageStack.splice(length - 1, 1);
                var pageId = this.pageStack[this.pageStack.length - 1];
                mEmulator.Emulator.instance.showPage(this.pages[pageId]);
            }
        };
        NavigationManager.prototype.clear = function () {
            this.pageStack = [];
            this.pages = [];
        };
        return NavigationManager;
    })();
    exports.NavigationManager = NavigationManager;    
})
