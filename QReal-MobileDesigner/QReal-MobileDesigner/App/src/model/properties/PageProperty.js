var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/model/properties/Property", "src/model/ControlType"], function(require, exports, Property, ControlType) {
    var PageProperty = (function (_super) {
        __extends(PageProperty, _super);
        function PageProperty(id) {
            _super.call(this, 0 /* Page */, id);
        }
        return PageProperty;
    })(Property);

    
    return PageProperty;
});
//# sourceMappingURL=PageProperty.js.map
