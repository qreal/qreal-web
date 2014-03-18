define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var DeviceManager = (function () {
        function DeviceManager() {
            this.log = new Log("DeviceManager");
            this.log.Debug("Init");
        }
        return DeviceManager;
    })();

    
    return DeviceManager;
});
//# sourceMappingURL=DeviceManager.js.map
