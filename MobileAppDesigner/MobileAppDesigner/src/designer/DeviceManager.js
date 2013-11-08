define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var DeviceManager = (function () {
        function DeviceManager() {
            this.log = new Log("DeviceManager");
            this.log.Debug("Init");

            var self = this;
            this.deviceFrame = $('#app-content-frame');
            this.deviceFrame.ready(function () {
                self.log.Debug('app-content-frame laoded');
                self.contents = self.deviceFrame.contents();
                self.contents.find('#mainPage').bind('drop', function (event) {
                    return self.OnDrop(event);
                });
                self.contents.find('#mainPage').bind('dragover', function (event) {
                    return self.OnDragOver(event);
                });
            });
        }
        DeviceManager.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop");
            event.preventDefault();
            var data = event.dataTransfer.getData("ControlId");
            this.log.Debug("OnDrop. data: " + data);
        };

        DeviceManager.prototype.OnDragOver = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            return false;
        };
        return DeviceManager;
    })();

    
    return DeviceManager;
});
//# sourceMappingURL=DeviceManager.js.map
