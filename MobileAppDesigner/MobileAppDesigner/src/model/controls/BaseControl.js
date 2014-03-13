define(["require", "exports", "src/util/log/Log"], function(require, exports, Log) {
    var BaseControl = (function () {
        function BaseControl(properties) {
            this.log = new Log("BaseControl");
            this.properties = properties;
        }
        Object.defineProperty(BaseControl.prototype, "Properties", {
            get: function () {
                return this.properties;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseControl.prototype, "Element", {
            get: function () {
                return this.element;
            },
            set: function (value) {
                this.element = value;
            },
            enumerable: true,
            configurable: true
        });

        return BaseControl;
    })();

    
    return BaseControl;
});
//# sourceMappingURL=BaseControl.js.map
