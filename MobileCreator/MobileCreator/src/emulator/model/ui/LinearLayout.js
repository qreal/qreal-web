var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "emulator/model/ui/ControlPanel", "emulator/model/attributes/LinearLayoutTag"], function(require, exports, __mControlPanel__, __mLinearLayoutTag__) {
    
    
    var mControlPanel = __mControlPanel__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var LinearLayout = (function (_super) {
        __extends(LinearLayout, _super);
        function LinearLayout(tag, $control) {
            if (typeof $control === "undefined") { $control = $("<div></div>"); }
                _super.call(this, tag, $control);
            this.setDimensions();
        }
        LinearLayout.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);
            this.$Control.append(child.$Control);
        };
        LinearLayout.prototype.create = function () {
            var tag = this.Tag;
            this.Childrens.map(function (child) {
                return child.create();
            });
            var childrenElements = this.$Control.children();
            var columns, rows;
            switch(tag.Orientation) {
                case mLinearLayoutTag.LinearLayoutTag.Horizontal:
                    columns = 0;
                    rows = 1;
                    break;
                case mLinearLayoutTag.LinearLayoutTag.Vertical:
                    columns = 1;
                    rows = 0;
                    break;
            }
            this.$Control.layout({
                type: 'flexGrid',
                columns: columns,
                rows: rows,
                items: childrenElements
            });
        };
        return LinearLayout;
    })(mControlPanel.ControlPanel);
    exports.LinearLayout = LinearLayout;    
})
