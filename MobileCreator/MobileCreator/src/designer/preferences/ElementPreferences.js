define(["require", "exports", "designer/widgets/WidgetTypes"], function(require, exports, __mWidgetTypes__) {
    var mWidgetTypes = __mWidgetTypes__;

    var ElementPreferences = (function () {
        function ElementPreferences() {
            this.widgetType = mWidgetTypes.WidgetTypes.Unknown;
        }
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
        Object.defineProperty(ElementPreferences.prototype, "WidgetType", {
            get: function () {
                return this.widgetType;
            },
            set: function (widgetType) {
                this.widgetType = widgetType;
            },
            enumerable: true,
            configurable: true
        });
        return ElementPreferences;
    })();
    exports.ElementPreferences = ElementPreferences;    
})
