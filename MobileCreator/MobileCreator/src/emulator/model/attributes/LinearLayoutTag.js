var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/ControlPanelTag"], function(require, exports, __mControlPanelTag__) {
    var mControlPanelTag = __mControlPanelTag__;

    var LinearLayoutTag = (function (_super) {
        __extends(LinearLayoutTag, _super);
        function LinearLayoutTag() {
                _super.call(this);
        }
        return LinearLayoutTag;
    })(mControlPanelTag.ControlPanelTag);
    exports.LinearLayoutTag = LinearLayoutTag;    
})
