define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var NavigationManager = (function () {
        function NavigationManager() {
            this.logger = new mLog.Logger("NavigationManager");
            this.pageStack = [];
            this.pages = [];
            this.logger.log("in constructor");
        }
        NavigationManager.prototype.addPage = function (pageId, page) {
            this.pages[pageId] = page;
        };
        NavigationManager.prototype.getPage = function (pageId) {
            var page = this.pages[pageId];
            this.pageStack.push(page);
            return page;
        };
        NavigationManager.prototype.back = function () {
            return this.pageStack.pop();
        };
        return NavigationManager;
    })();
    exports.NavigationManager = NavigationManager;    
})
