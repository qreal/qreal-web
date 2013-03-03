var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/model/Widget", "designer/model/WidgetTypes"], function(require, exports, __mWidget__, __mWidgetTypes__) {
    var mWidget = __mWidget__;

    
    var mWidgetTypes = __mWidgetTypes__;

    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(id, layoutWidth, LayoutHeight) {
                _super.call(this, id, layoutWidth, LayoutHeight, mWidgetTypes.WidgetType.Button);
            this.text = "";
            this.idName = "";
            this.textSize = "15px";
            this.layoutMarginTop = "10px";
            this.onClick = "";
        }
        Object.defineProperty(Button.prototype, "Text", {
            get: function () {
                return this.text;
            },
            set: function (text) {
                this.text = text;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "IdName", {
            get: function () {
                return this.idName;
            },
            set: function (idName) {
                this.idName = idName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TextSize", {
            get: function () {
                return this.textSize;
            },
            set: function (textSize) {
                this.textSize = textSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "LayoutMarginTop", {
            get: function () {
                return this.layoutMarginTop;
            },
            set: function (layoutMarginTop) {
                this.layoutMarginTop = layoutMarginTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "OnClick", {
            get: function () {
                return this.onClick;
            },
            set: function (onClick) {
                this.onClick = onClick;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    })(mWidget.Widget);
    exports.Button = Button;    
})
