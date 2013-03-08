define(["require", "exports", "designer/model/WidgetTypes"], function(require, exports, __mWidgetTypes__) {
    var mWidgetTypes = __mWidgetTypes__;

    var Widget = (function () {
        function Widget(id, layoutWidth, layoutHeight, widgetType) {
            this.layoutWidth = layoutWidth;
            this.layoutHeight = layoutHeight;
            this.id = id;
            this.widgetType = widgetType || mWidgetTypes.WidgetType.Unknown;
        }
        Object.defineProperty(Widget.prototype, "WidgetType", {
            get: function () {
                return this.widgetType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "Id", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "LayoutWidth", {
            get: function () {
                return this.layoutWidth;
            },
            set: function (layoutWidth) {
                this.layoutWidth = this.LayoutWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "LayoutHeight", {
            get: function () {
                return this.layoutWidth;
            },
            set: function (layoutHeight) {
                this.layoutWidth = this.LayoutHeight;
            },
            enumerable: true,
            configurable: true
        });
        return Widget;
    })();
    exports.Widget = Widget;    
})
