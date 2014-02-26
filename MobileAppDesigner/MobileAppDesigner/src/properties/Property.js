define(["require", "exports"], function(require, exports) {
    var Property = (function () {
        function Property(type) {
            this.Type = type;
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

        Property.TypeButton = "Button";
        return Property;
    })();

    
    return Property;
});
//# sourceMappingURL=Property.js.map
