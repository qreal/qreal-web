define(["require", "exports", "util/log/Log", "src/designer/ToolsView"], function(require, exports, __Log__, __ToolsView__) {
    var Log = __Log__;
    var ToolsView = __ToolsView__;

    var Controller = (function () {
        function Controller() {
            this.log = new Log("Controller");
            this.toolsView = new ToolsView();
        }
        Object.defineProperty(Controller, "Instance", {
            get: function () {
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        Controller.prototype.Init = function () {
            this.log.Debug("Init!!");
            this.toolsView.Init();
        };
        Controller.instance = new Controller();
        return Controller;
    })();

    
    return Controller;
});
