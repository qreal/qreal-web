define(["require", "exports"], function(require, exports) {
    var ElementPreferences = (function () {
        function ElementPreferences() { }
        ElementPreferences.FillParent = 0;
        ElementPreferences.WrapContent = -1;
        Object.defineProperty(ElementPreferences.prototype, "Width", {
            get: function () {
                return this.width;
            },
            set: function (width) {
                this.width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementPreferences.prototype, "Height", {
            get: function () {
                return this.height;
            },
            set: function (height) {
                this.height = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementPreferences.prototype, "Id", {
            get: function () {
                return this.id;
            },
            set: function (id) {
                this.id = id;
            },
            enumerable: true,
            configurable: true
        });
        return ElementPreferences;
    })();
    exports.ElementPreferences = ElementPreferences;    
})
