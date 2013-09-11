define(["require", "exports", "app/classes/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var Controller = (function () {
        function Controller() {
            this.log = new Log("Controller");
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
        };
        Controller.instance = new Controller();
        return Controller;
    })();

    
    return Controller;
});
