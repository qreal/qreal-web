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
        }
        LinearLayout.prototype.getElement = function () {
            this.element = $("<div id='" + this.Tag.Id + "'></div>");
            var childrens = this.getChildrens();
            for(var i in childrens) {
                this.element.append(childrens[i].getElement());
            }
            return this.element;
        };
        LinearLayout.prototype.create = function () {
            var childrenElements = new Array();
            var childrens = this.getChildrens();
            for(var i in childrens) {
                childrenElements.push($("#" + childrens[i].id));
                childrens[i].create();
            }
            jQuery(function ($) {
                $('#code').layout({
                    type: 'flexGrid',
                    columns: 1,
                    items: childrenElements
                });
            });
        };
        return LinearLayout;
    })(mControlPanel.ControlPanel);
    exports.LinearLayout = LinearLayout;    
})
