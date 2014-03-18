define(["require", "exports", "src/util/log/Log"], function(require, exports, Log) {
    var Application = (function () {
        function Application() {
            this.device = null;
            this.designer = null;
        }
        Object.defineProperty(Application, "Instance", {
            get: function () {
                Application.log.Debug('Get Instance');
                if (!Application.instance) {
                    Application.log.Debug('Instance is null. Create new');
                    Application.instance = new Application();
                }
                return Application.instance;
            },
            set: function (value) {
                Application.log.Debug('Set Instance');
                Application.instance = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Application.prototype, "Device", {
            get: function () {
                return this.device;
            },
            set: function (value) {
                this.device = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Application.prototype, "Designer", {
            get: function () {
                return this.designer;
            },
            set: function (value) {
                this.designer = value;
            },
            enumerable: true,
            configurable: true
        });

        Application.log = new Log('Application');

        Application.instance = null;
        return Application;
    })();
    
    return Application;
});
//# sourceMappingURL=Application.js.map
