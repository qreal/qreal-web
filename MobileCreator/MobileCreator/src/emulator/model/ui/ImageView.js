var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};


var mControl = require("./emulator/model/ui/Control")
var ImageView = (function (_super) {
    __extends(ImageView, _super);
    function ImageView(tag, $control) {
        if (typeof $control === "undefined") { $control = $("<div></div>"); }
        _super.call(this, tag, $control);
        var $img = $("<img></img>");
        $img.attr('src', tag.ImageUrl);
        this.$Control.append($img);
        this.setDimensions($img);
        this.setDimensions();
    }
    return ImageView;
})(mControl.Control);
exports.ImageView = ImageView;
//@ sourceMappingURL=ImageView.js.map
