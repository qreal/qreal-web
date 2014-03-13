var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log", "src/model/properties/ButtonProperty", "src/model/controls/BaseControl"], function(require, exports, Log, ButtonProperty, BaseControl) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(id) {
            _super.call(this, new ButtonProperty(id));
            this.log = new Log("Button");
        }
        return Button;
    })(BaseControl);

    
    return Button;
});
//# sourceMappingURL=Button.js.map
