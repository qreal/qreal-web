define(["require", "exports", "src/util/log/Log", "src/designer/ToolsView", "src/util/events/EventManager"], function(require, exports, __Log__, __ToolsView__, __EventManager__) {
    var Log = __Log__;
    var ToolsView = __ToolsView__;
    var EventManager = __EventManager__;

    var Controller = (function () {
        function Controller() {
            this.log = new Log("Controller");
            this.log.Debug("In constructor");
            this.toolsView = new ToolsView(this);
            this.eventManager = new EventManager($('body'));
        }
        Object.defineProperty(Controller, "Instance", {
            get: function () {
                new Log("Controller").Debug("get Instance");
                if (!this.instance) {
                    this.instance = new Controller();
                }
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        Controller.prototype.Init = function () {
            this.log.Debug("Init");
            this.toolsView.Init();
        };

        Object.defineProperty(Controller.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });
        return Controller;
    })();

    
    return Controller;
});
//# sourceMappingURL=Controller.js.map
