var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/attributes/ControlTag"], function(require, exports, __mControlTag__) {
    var mControlTag = __mControlTag__;

    var MapTag = (function (_super) {
        __extends(MapTag, _super);
        function MapTag() {
                _super.call(this);
        }
        return MapTag;
    })(mControlTag.ControlTag);
    exports.MapTag = MapTag;    
})
