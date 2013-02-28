define(["require", "exports"], function(require, exports) {
    
    var Control = (function () {
        function Control(tag, $control) {
            this.$Control = $control;
            this.Tag = tag;
            this.$Control.attr('id', tag.Id);
        }
        Object.defineProperty(Control.prototype, "$Control", {
            get: function () {
                return this.$control;
            },
            set: function (value) {
                this.$control = value;
            },
            enumerable: true,
            configurable: true
        });
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
        Control.prototype.create = function () {
        };
        return Control;
    })();
    exports.Control = Control;    
})
