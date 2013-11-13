define(["require", "exports"], function(require, exports) {
    var Property = (function () {
        function Property() {
        }
        Object.defineProperty(Property.prototype, "Type", {
            get: function () {
                return this.type;
            },
            set: function (value) {
                this.type = value;
            },
            enumerable: true,
            configurable: true
        });

        return Property;
    })();

    
    return Property;
});
//# sourceMappingURL=Property.js.map
