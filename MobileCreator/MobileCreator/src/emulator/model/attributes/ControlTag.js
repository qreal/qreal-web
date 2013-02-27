define(["require", "exports"], function(require, exports) {
    var ControlTag = (function () {
        function ControlTag() {
            this.width = ControlTag.WrapContent;
            this.height = ControlTag.WrapContent;
            this.background = "#ffffff";
        }
        Object.defineProperty(ControlTag.prototype, "Id", {
            get: function () {
                return this.id;
            },
            set: function (value) {
                this.id = value;
            },
            enumerable: true,
            configurable: true
        });
        ControlTag.WrapContent = -2;
        ControlTag.MatchParrent = -1;
        Object.defineProperty(ControlTag.prototype, "Width", {
            get: function () {
                return this.width;
            },
            set: function (value) {
                this.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlTag.prototype, "Height", {
            get: function () {
                return this.height;
            },
            set: function (value) {
                this.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlTag.prototype, "Background", {
            get: function () {
                return this.background;
            },
            set: function (value) {
                this.background = value;
            },
            enumerable: true,
            configurable: true
        });
        return ControlTag;
    })();
    exports.ControlTag = ControlTag;    
})
