var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/Control"], function(require, exports, __mControl__) {
    var mControl = __mControl__;

    
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<iframe></iframe>"); }
                _super.call(this, tag, $control);
            this.url = "http://www.bing.com/maps/embed/viewer.aspx?v=3&cp=59.876984~29.839293&lvl=15&w=&mkt=en-us&src=SHELL&form=BMEMJS";
            this.setDimensions($control);
            this.$Control.attr('src', this.url);
        }
        return Map;
    })(mControl.Control);
    exports.Map = Map;    
})
//@ sourceMappingURL=Map.js.map
