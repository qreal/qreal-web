var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log", "src/model/controls/BaseControl"], function(require, exports, Log, BaseControl) {
    var BaseContainer = (function (_super) {
        __extends(BaseContainer, _super);
        function BaseContainer(properties) {
            _super.call(this, properties);
            this.childrens = new Array();
            this.log = new Log("BaseContainer");
        }
        Object.defineProperty(BaseContainer.prototype, "Childrens", {
            get: function () {
                return this.childrens;
            },
            enumerable: true,
            configurable: true
        });

        BaseContainer.prototype.Create = function () {
            this.log.Error("This method should not be used");
            return $("");
        };

        BaseContainer.prototype.CreateForDesigner = function () {
            this.log.Error("This method should not be used");
            return $("");
        };
        return BaseContainer;
    })(BaseControl);

    
    return BaseContainer;
});
//# sourceMappingURL=BaseContainer.js.map
