var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/ControlPanel"], function(require, exports, __mControlPanel__) {
    
    var mControlPanel = __mControlPanel__;

    
    var LinearLayout = (function (_super) {
        __extends(LinearLayout, _super);
        function LinearLayout(tag) {
                _super.call(this, tag);
            this.ElementJQuery = $("<div></div>");
            this.ElementJQuery.attr('id', tag.Id);
        }
        LinearLayout.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);
            this.ElementJQuery.append(child.ElementJQuery);
        };
        LinearLayout.prototype.create = function () {
            var childrenElements = this.ElementJQuery.children();
            ;
            var childrens = this.getChildrens();
            childrens.map(function (child) {
                return child.create();
            });
            $('#' + this.Tag.Id).layout({
                type: 'flexGrid',
                columns: 1,
                items: childrenElements
            });
        };
        return LinearLayout;
    })(mControlPanel.ControlPanel);
    exports.LinearLayout = LinearLayout;    
})
