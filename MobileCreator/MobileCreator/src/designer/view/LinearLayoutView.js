var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/view/WidgetView", "designer/model/SpecialValues"], function(require, exports, __mWidgetView__, __mSpecialValues__) {
    var mWidgetView = __mWidgetView__;

    var mSpecialValues = __mSpecialValues__;

    var LinearLayoutView = (function (_super) {
        __extends(LinearLayoutView, _super);
        function LinearLayoutView() {
            _super.apply(this, arguments);

            this.children = [];
            this.control = $("<div></div>");
            this.orientation = mSpecialValues.SpecialLinearLayoutOrientation.Horizontal;
            this.backGroundColor = "#ffffff";
        }
        Object.defineProperty(LinearLayoutView.prototype, "Orientation", {
            get: function () {
                return this.orientation;
            },
            set: function (orientation) {
                this.orientation = orientation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutView.prototype, "BackGroundColor", {
            get: function () {
                return this.backGroundColor;
            },
            set: function (color) {
                this.backGroundColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutView.prototype, "Children", {
            get: function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        LinearLayoutView.prototype.draw = function () {
            if(this.LayoutHeight == mSpecialValues.SpecialSizeValue.FillParent) {
                this.control.css("height", "100%");
            } else if(this.LayoutHeight == mSpecialValues.SpecialSizeValue.WrapContent) {
                this.control.css("height", "auto");
            } else {
                this.control.css("height", this.LayoutHeight);
            }
            if(this.LayoutWidth == mSpecialValues.SpecialSizeValue.FillParent) {
                this.control.css("width", "100%");
            } else if(this.LayoutWidth == mSpecialValues.SpecialSizeValue.WrapContent) {
                this.control.css("width", "auto");
            } else {
                this.control.css("width", this.LayoutHeight);
            }
            this.control.css("background-color", this.backGroundColor);
            var _this = this;
            this.children.forEach(function (child) {
                child.draw();
                _this.control.append(child.Control);
            });
        };
        LinearLayoutView.prototype.addChild = function (child) {
            this.children.push(child);
        };
        return LinearLayoutView;
    })(mWidgetView.WidgetView);
    exports.LinearLayoutView = LinearLayoutView;    
})
