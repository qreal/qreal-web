define(["require", "exports"], function(require, exports) {
    
    var Control = (function () {
        function Control(tag) {
            this.Tag = tag;
        }
        Object.defineProperty(Control.prototype, "Tag", {
            get: function () {
                return this.tag;
            },
            set: function (value) {
                this.tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Control.prototype.getElement = function () {
            return $("Control");
        };
        Control.prototype.create = function () {
        };
        return Control;
    })();
    exports.Control = Control;    
})
