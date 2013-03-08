var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/model/Widget", "designer/model/SpecialValues", "designer/model/WidgetTypes"], function(require, exports, __mWidget__, __mSpecialValues__, __mWidgetTypes__) {
    var mWidget = __mWidget__;

    var mSpecialValues = __mSpecialValues__;

    var mWidgetTypes = __mWidgetTypes__;

    var LinearLayout = (function (_super) {
        __extends(LinearLayout, _super);
        function LinearLayout(id, layoutWidth, LayoutHeight) {
                _super.call(this, id, layoutWidth, LayoutHeight, mWidgetTypes.WidgetType.LinearLayout);
            this.orientation = mSpecialValues.SpecialLinearLayoutOrientation.Horizontal;
            this.backGroundColor = "#ffffff";
            this.children = [];
        }
        Object.defineProperty(LinearLayout.prototype, "Orientation", {
            get: function () {
                return this.orientation;
            },
            set: function (orientation) {
                this.orientation = orientation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayout.prototype, "BackGroundColor", {
            get: function () {
                return this.backGroundColor;
            },
            set: function (color) {
                this.backGroundColor = color;
            },
            enumerable: true,
            configurable: true
        });
        LinearLayout.prototype.addChild = function (child) {
            this.children.push(child);
        };
        LinearLayout.prototype.deleteChild = function (childId) {
            var indexToDel = -1;
            for(var i = 0; i < this.children.length; i++) {
                if(this.children[i].Id == childId) {
                    indexToDel = i;
                    break;
                }
            }
            this.children.splice(indexToDel, 1);
        };
        LinearLayout.prototype.swapChildren = function (firstChildId, secondChildId) {
            var firstIndex = -1;
            var secondIndex = -1;
            for(var i = 0; i < this.children.length; i++) {
                if(this.children[i].Id == firstChildId) {
                    firstIndex = i;
                }
                if(this.children[i].Id == secondChildId) {
                    secondIndex = i;
                }
                if(firstIndex != -1 && secondIndex != -1) {
                    break;
                }
            }
            var temp = this.children[firstIndex];
            this.children[firstIndex] = this.children[secondIndex];
            this.children[secondIndex] = temp;
        };
        return LinearLayout;
    })(mWidget.Widget);
    exports.LinearLayout = LinearLayout;    
})
