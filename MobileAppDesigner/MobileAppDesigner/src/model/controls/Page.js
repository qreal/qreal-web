var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log", "src/model/properties/PageProperty", "src/model/controls/BaseContainer"], function(require, exports, Log, PageProperty, BaseContainer) {
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(id) {
            _super.call(this, new PageProperty(id));
            this.log = new Log("Page");
        }
        return Page;
    })(BaseContainer);

    
    return BaseContainer;
});
//# sourceMappingURL=Page.js.map
