define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var DeviceController = (function () {
        function DeviceController() {
            this.log = new Log("DeviceController");
            this.log.Debug("In constructor");
        }
        Object.defineProperty(DeviceController, "Instance", {
            get: function () {
                new Log("DeviceController").Debug("get Instance");
                if (!this.instance) {
                    this.instance = new DeviceController();
                }
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        DeviceController.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");
            $('#mainPage').on('drop', function (event) {
                return _this.OnDrop(event);
            });
            $('#mainPage').on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
            var self = this;
            (parent).$('body').on('eventname', function (e) {
                self.log.Debug("Yesss!!!");
            });
        };

        DeviceController.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop");
            event.preventDefault();
            console.log(event);
            var data = event.originalEvent.dataTransfer.getData("ControlId");
            this.log.Debug("OnDrop. data: " + data);

            var bt = $("<button>My Button</button>");
            $(event.currentTarget).append(bt);
            bt.button();
        };

        DeviceController.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };
        return DeviceController;
    })();

    
    return DeviceController;
});
//# sourceMappingURL=DeviceController.js.map
