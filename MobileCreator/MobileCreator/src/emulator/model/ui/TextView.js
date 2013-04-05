var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mControl = require("./emulator/model/ui/Control")

var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView(tag, $control) {
        if (typeof $control === "undefined") { $control = $("<div></div>"); }
        _super.call(this, tag, $control);
        var $label = $("<label></label>");
        $label.text(tag.Text);
        if(tag.TextSize > 0) {
            $label.css('font-size', tag.TextSize);
        }
        this.setDimensions();
        this.$Control.append($label);
    }
    return TextView;
})(mControl.Control);
exports.TextView = TextView;
//@ sourceMappingURL=TextView.js.map
