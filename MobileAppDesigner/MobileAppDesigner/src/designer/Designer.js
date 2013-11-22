define(["require", "exports", "src/util/log/Log", "src/Application", "src/util/events/EventManager", "src/designer/ToolsView", "src/designer/PropertiesView"], function(require, exports, __Log__, __App__, __EventManager__, __ToolsView__, __PropertiesView__) {
    var Log = __Log__;
    var App = __App__;
    var EventManager = __EventManager__;
    var ToolsView = __ToolsView__;
    var PropertiesView = __PropertiesView__;

    var Designer = (function () {
        function Designer() {
            this.log = new Log("Designer");
            this.log.Debug("constructor");
            this.toolsView = new ToolsView();
            this.propertiesView = new PropertiesView();
            this.eventManager = new EventManager($('body'));
        }
        Designer.prototype.Init = function () {
            this.log.Debug("Init");
            this.toolsView.Init();
            this.propertiesView.Init();
        };

        Object.defineProperty(Designer.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });
        return Designer;
    })();

    
    return Designer;
});
//# sourceMappingURL=Designer.js.map
