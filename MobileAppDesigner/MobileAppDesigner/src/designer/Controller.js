define(["require", "exports", "src/util/log/Log", "src/util/events/EventManager", "src/designer/ToolsView", "src/designer/PropertiesView"], function(require, exports, __Log__, __EventManager__, __ToolsView__, __PropertiesView__) {
    var Log = __Log__;
    var EventManager = __EventManager__;
    var ToolsView = __ToolsView__;
    var PropertiesView = __PropertiesView__;

    var Controller = (function () {
        function Controller() {
            this.log = new Log("Controller");
            this.log.Debug("constructor");
            this.toolsView = new ToolsView(this);
            this.propertiesView = new PropertiesView(this);
            this.eventManager = new EventManager($('body'));
        }
        Object.defineProperty(Controller, "Instance", {
            get: function () {
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        Controller.prototype.Init = function () {
            this.log.Debug("Init");
            this.toolsView.Init();
            this.propertiesView.Init();
        };

        Object.defineProperty(Controller.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });
        Controller.instance = new Controller();
        return Controller;
    })();

    
    return Controller;
});
//# sourceMappingURL=Controller.js.map
