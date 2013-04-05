define(["require", "exports", "utils/log/Log", "emulator/model/ui/ControlPanel", "emulator/model/Emulator"], function(require, exports, __mLog__, __mControlPanel__, __mEmulator__) {
    var mLog = __mLog__;

    
    var mControlPanel = __mControlPanel__;

    
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
            if(this.currentPage) {
                this.currentPage.onHide();
            }
            mEmulator.Emulator.instance.showPage(page.Root);
            this.currentPage = page;
            page.onShow();
        };
        NavigationManager.prototype.findControlById = function (id) {
            var control;
            var root = this.currentPage;
            return this.getControlById(root.Root, id);
        };
        NavigationManager.prototype.getControlById = function (root, id) {
            if(!root) {
                return undefined;
            }
            if(root.Tag.Id == id) {
                return root;
            }
            if(root instanceof mControlPanel.ControlPanel) {
                var childrens = (root).Childrens;
                for(var i = 0; i < childrens.length; i++) {
                    var control = this.getControlById(childrens[i], id);
                    if(control) {
                        return control;
                    }
                }
                ;
            }
            return undefined;
        };
        NavigationManager.prototype.back = function () {
            var length = this.pageStack.length;
            if(length > 1) {
                this.pageStack.splice(length - 1, 1);
                var pageId = this.pageStack[this.pageStack.length - 1];
                if(this.currentPage) {
                    this.currentPage.onHide();
                }
                this.currentPage = this.pages[pageId];
                mEmulator.Emulator.instance.showPage(this.pages[pageId].Root);
                this.currentPage.onShow();
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
