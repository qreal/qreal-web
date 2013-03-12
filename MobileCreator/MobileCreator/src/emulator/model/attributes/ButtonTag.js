var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/TextViewTag"], function(require, exports, __mTextViewTag__) {
    var mTextViewTag = __mTextViewTag__;

    var ButtonTag = (function (_super) {
        __extends(ButtonTag, _super);
        function ButtonTag() {
                _super.call(this);
        }
        Object.defineProperty(ButtonTag.prototype, "OnClick", {
            get: function () {
                return this.onClick;
            },
            set: function (value) {
                this.onClick = value;
            },
            enumerable: true,
            configurable: true
        });
        return ButtonTag;
    })(mTextViewTag.TextViewTag);
    exports.ButtonTag = ButtonTag;    
})
