var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/model/properties/Property", "src/model/Enums"], function(require, exports, Property, Enums) {
    var HeaderProperty = (function (_super) {
        __extends(HeaderProperty, _super);
        function HeaderProperty(id) {
            _super.call(this, 1 /* Header */, id);
        }
        return HeaderProperty;
    })(Property);

    
    return HeaderProperty;
});
//# sourceMappingURL=HeaderProperty.js.map
