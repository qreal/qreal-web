/// <reference path="../../../lib/jquery.d.ts" />
import mWidgetView = module("designer/view/WidgetView")
import mSpecialValues = module("designer/model/SpecialValues")

export class LinearLayoutView extends mWidgetView.WidgetView{
    private children: mWidgetView.WidgetView[] = [];
    private control: JQuery = $("<div></div>");
    private orientation = mSpecialValues.SpecialLinearLayoutOrientation.Horizontal;
    private backGroundColor: string = "#ffffff";

    get Orientation() {
        return this.orientation;
    }

    set Orientation(orientation) {
        this.orientation = orientation;
    }

    get BackGroundColor() {
        return this.backGroundColor;
    }

    set BackGroundColor(color: string) {
        this.backGroundColor = color;
    }

    get Children() {
        return this.children;
    }

    public draw() {
        if (this.LayoutHeight == mSpecialValues.SpecialSizeValue.FillParent) {
            this.control.css("height", "100%");
        } else if (this.LayoutHeight == mSpecialValues.SpecialSizeValue.WrapContent) {
            this.control.css("height", "auto");
        } else {
            this.control.css("height", this.LayoutHeight);
        }
        if (this.LayoutWidth == mSpecialValues.SpecialSizeValue.FillParent) {
            this.control.css("width", "100%");
        } else if (this.LayoutWidth == mSpecialValues.SpecialSizeValue.WrapContent) {
            this.control.css("width", "auto");
        } else {
            this.control.css("width", this.LayoutHeight);
        }
        this.control.css("background-color", this.backGroundColor);
        var _this = this;
        this.children.forEach(function (child) {
            _this.control.append(child);
            child.draw();
        });
    }

    public addChild(child: mWidgetView.WidgetView) {
        this.children.push(child);

    }
}