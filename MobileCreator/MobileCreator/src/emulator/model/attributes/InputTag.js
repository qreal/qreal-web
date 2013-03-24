var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/TextViewTag"], function(require, exports, __mTestViewTag__) {
    var mTestViewTag = __mTestViewTag__;

    var InputTag = (function (_super) {
        __extends(InputTag, _super);
        function InputTag() {
                _super.call(this);
        }
        return InputTag;
    })(mTestViewTag.TextViewTag);
    exports.InputTag = InputTag;    
})
