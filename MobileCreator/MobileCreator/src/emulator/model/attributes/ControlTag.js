define(["require", "exports"], function(require, exports) {
    var ControlTag = (function () {
        function ControlTag() {
            this.width = ControlTag.WrapContent;
            this.height = ControlTag.WrapContent;
            this.background = "#ffffff";
            this.gravity = "center";
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
        Object.defineProperty(ControlTag.prototype, "MarginLeft", {
            get: function () {
                return this.marginLeft;
            },
            set: function (value) {
                this.marginLeft = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlTag.prototype, "MarginRight", {
            get: function () {
                return this.marginRight;
            },
            set: function (value) {
                this.marginRight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlTag.prototype, "MarginTop", {
            get: function () {
                return this.marginTop;
            },
            set: function (value) {
                this.marginTop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlTag.prototype, "MarginBottom", {
            get: function () {
                return this.marginBottom;
            },
            set: function (value) {
                this.marginBottom = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlTag.prototype, "Gravity", {
            get: function () {
                return this.gravity;
            },
            set: function (value) {
                this.gravity = value;
            },
            enumerable: true,
            configurable: true
        });
        return ControlTag;
    })();
    exports.ControlTag = ControlTag;    
})
