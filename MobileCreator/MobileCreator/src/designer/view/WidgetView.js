define(["require", "exports"], function(require, exports) {
    var WidgetView = (function () {
        function WidgetView(id, layoutWidth, layoutHeight) {
            this.layoutWidth = layoutWidth;
            this.layoutHeight = layoutHeight;
            this.modelWidgetId = id;
        }
        Object.defineProperty(WidgetView.prototype, "Control", {
            get: function () {
                return this.control;
            },
            enumerable: true,
            configurable: true
        });
        WidgetView.prototype.draw = function () {
        };
        Object.defineProperty(WidgetView.prototype, "ModelWidgetId", {
            get: function () {
                return this.modelWidgetId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetView.prototype, "LayoutWidth", {
            get: function () {
                return this.layoutWidth;
            },
            set: function (layoutWidth) {
                this.layoutWidth = this.LayoutWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WidgetView.prototype, "LayoutHeight", {
            get: function () {
                return this.layoutWidth;
            },
            set: function (layoutHeight) {
                this.layoutWidth = this.LayoutHeight;
            },
            enumerable: true,
            configurable: true
        });
        return WidgetView;
    })();
    exports.WidgetView = WidgetView;    
})
