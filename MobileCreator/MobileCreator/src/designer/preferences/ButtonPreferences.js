var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/preferences/ElementPreferences"], function(require, exports, __mElementPreferences__) {
    var mElementPreferences = __mElementPreferences__;

    var ButtonPreferences = (function (_super) {
        __extends(ButtonPreferences, _super);
        function ButtonPreferences() {
            _super.apply(this, arguments);

        }
        Object.defineProperty(ButtonPreferences.prototype, "LayoutMarginTop", {
            get: function () {
                return this.layoutMarginTop;
            },
            set: function (layoutMarginTop) {
                this.layoutMarginTop = layoutMarginTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonPreferences.prototype, "Text", {
            get: function () {
                return this.text;
            },
            set: function (text) {
                this.text = text;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonPreferences.prototype, "TextSize", {
            get: function () {
                return this.textSize;
            },
            set: function (textSize) {
                this.textSize = textSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonPreferences.prototype, "ButtonId", {
            get: function () {
                return this.buttonId;
            },
            set: function (buttonId) {
                this.buttonId = buttonId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonPreferences.prototype, "OnClickHandler", {
            get: function () {
                return this.onClickHandler;
            },
            set: function (onClickHandler) {
                this.onClickHandler = onClickHandler;
            },
            enumerable: true,
            configurable: true
        });
        return ButtonPreferences;
    })(mElementPreferences.ElementPreferences);
    exports.ButtonPreferences = ButtonPreferences;    
})
//@ sourceMappingURL=ButtonPreferences.js.map
