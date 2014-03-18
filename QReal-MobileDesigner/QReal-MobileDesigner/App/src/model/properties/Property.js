define(["require", "exports"], function(require, exports) {
    var Property = (function () {
        function Property(type, id) {
            this.Type = type;
            this.Id = id;
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


        Object.defineProperty(Property.prototype, "Id", {
            get: function () {
                return this.id;
            },
            set: function (value) {
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });

        return Property;
    })();

    
    return Property;
});
//# sourceMappingURL=Property.js.map
