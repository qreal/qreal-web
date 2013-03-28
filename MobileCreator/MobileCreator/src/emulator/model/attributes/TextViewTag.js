var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/ControlTag"], function(require, exports, __mControlTag__) {
    var mControlTag = __mControlTag__;

    var TextViewTag = (function (_super) {
        __extends(TextViewTag, _super);
        function TextViewTag() {
                _super.call(this);
            this.textSize = 0;
        }
        Object.defineProperty(TextViewTag.prototype, "Text", {
            get: function () {
                return this.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextViewTag.prototype, "TextSize", {
            get: function () {
                return this.textSize;
            },
            set: function (value) {
                this.textSize = value;
            },
            enumerable: true,
            configurable: true
        });
        return TextViewTag;
    })(mControlTag.ControlTag);
    exports.TextViewTag = TextViewTag;    
})
