var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control"], function(require, exports, __control__) {
    var control = __control__;

    
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(tag) {
                _super.call(this, tag);
        }
        Button.prototype.getElement = function () {
            this.element = $("<a id='" + this.Tag.Id + "'>Button</a>");
            return this.element;
        };
        Button.prototype.create = function () {
            this.element.button();
        };
        return Button;
    })(control.Control);
    exports.Button = Button;    
})
