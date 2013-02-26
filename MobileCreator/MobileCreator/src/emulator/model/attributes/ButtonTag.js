var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/ControlTag"], function(require, exports, __mControlTag__) {
    var mControlTag = __mControlTag__;

    var ButtonTag = (function (_super) {
        __extends(ButtonTag, _super);
        function ButtonTag() {
                _super.call(this);
        }
        return ButtonTag;
    })(mControlTag.ControlTag);
    exports.ButtonTag = ButtonTag;    
})
