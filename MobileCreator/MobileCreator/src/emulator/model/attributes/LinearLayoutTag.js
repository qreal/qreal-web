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
            this.orientation = LinearLayoutTag.Horizontal;
        }
        LinearLayoutTag.Horizontal = 1;
        LinearLayoutTag.Vertical = 2;
        Object.defineProperty(LinearLayoutTag.prototype, "Orientation", {
            get: function () {
                return this.orientation;
            },
            set: function (value) {
                this.orientation = value;
            },
            enumerable: true,
            configurable: true
        });
        return LinearLayoutTag;
    })(mControlPanelTag.ControlPanelTag);
    exports.LinearLayoutTag = LinearLayoutTag;    
})
