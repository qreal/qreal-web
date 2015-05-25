var CommonRobotModelImpl = (function () {
    function CommonRobotModelImpl() {
        this.ports = [];
        this.allowedConnections = {};
    }
    CommonRobotModelImpl.prototype.getAvailablePorts = function () {
        return this.ports;
    };
    CommonRobotModelImpl.prototype.addAllowedConnection = function (port, devices) {
        this.ports.push(port);
        this.allowedConnections[this.ports.indexOf(port)] = devices;
    };
    CommonRobotModelImpl.prototype.getConfigurablePorts = function () {
        var result = [];
        var robotModel = this;
        robotModel.getAvailablePorts().forEach(function (port) {
            var devices = robotModel.getAllowedDevices(port);
            if (devices.length > 1) {
                result.push(port);
            }
        });
        return result;
    };
    CommonRobotModelImpl.prototype.getAllowedDevices = function (port) {
        return this.allowedConnections[this.ports.indexOf(port)];
    };
    return CommonRobotModelImpl;
})();
//# sourceMappingURL=CommonRobotModelImpl.js.map