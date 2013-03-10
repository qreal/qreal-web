define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var NavigationManager = (function () {
        function NavigationManager() {
            this.logger = new mLog.Logger("NavigationManager");
            this.pageStack = [];
        }
        NavigationManager.prototype.showView = function (view) {
        };
        NavigationManager.prototype.back = function () {
        };
        return NavigationManager;
    })();
    exports.NavigationManager = NavigationManager;    
})
