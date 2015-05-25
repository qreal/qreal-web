var DeviceInfoImpl = (function () {
    function DeviceInfoImpl(deviceType) {
        this.deviceType = deviceType;
        this.name = deviceType.name;
        this.friendlyName = deviceType.friendlyName;
    }
    DeviceInfoImpl.fromString = function (str) {
        if (!DeviceInfoImpl.createdInfos[str]) {
            throw new Error("DeviceInfo for " + str + " not found");
        }
        else {
            return DeviceInfoImpl.createdInfos[str];
        }
    };
    DeviceInfoImpl.getInstance = function (deviceType) {
        if (!DeviceInfoImpl.createdInfos[deviceType.name]) {
            var deviceInfo = new DeviceInfoImpl(deviceType);
            DeviceInfoImpl.createdInfos[deviceType.name] = deviceInfo;
            return deviceInfo;
        }
        else {
            return DeviceInfoImpl.createdInfos[deviceType.name];
        }
    };
    DeviceInfoImpl.prototype.getName = function () {
        return this.name;
    };
    DeviceInfoImpl.prototype.getFriendlyName = function () {
        return this.friendlyName;
    };
    DeviceInfoImpl.prototype.getType = function () {
        return this.deviceType;
    };
    DeviceInfoImpl.prototype.isA = function (type) {
        var currentParent = this.deviceType;
        while (currentParent && currentParent !== type) {
            currentParent = currentParent.parentType;
        }
        return currentParent != undefined;
    };
    DeviceInfoImpl.createdInfos = {};
    return DeviceInfoImpl;
})();
//# sourceMappingURL=DeviceInfoImpl.js.map