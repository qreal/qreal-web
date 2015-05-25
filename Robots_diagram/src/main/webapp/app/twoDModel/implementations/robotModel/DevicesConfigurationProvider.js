var DevicesConfigurationProvider = (function () {
    function DevicesConfigurationProvider() {
        this.currentConfiguration = {};
    }
    DevicesConfigurationProvider.prototype.deviceConfigurationChanged = function (robotModelName, portName, device) {
        if (!this.currentConfiguration[robotModelName]) {
            this.currentConfiguration[robotModelName] = {};
        }
        if (device == null) {
            if (this.currentConfiguration[robotModelName][portName]) {
                delete this.currentConfiguration[robotModelName][portName];
            }
        }
        else {
            this.currentConfiguration[robotModelName][portName] = device;
        }
    };
    DevicesConfigurationProvider.prototype.getCurrentConfiguration = function (robotModelName, portName) {
        if (!this.currentConfiguration[robotModelName] || !this.currentConfiguration[robotModelName][portName]) {
            return null;
        }
        return this.currentConfiguration[robotModelName][portName];
    };
    return DevicesConfigurationProvider;
})();
//# sourceMappingURL=DevicesConfigurationProvider.js.map