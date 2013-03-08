import mWidget = module("designer/model/Widget");
import mSpecialValues = module("designer/model/SpecialValues")
import mWidgetTypes = module("designer/model/WidgetTypes");

export class LinearLayout extends mWidget.Widget {
    private orientation = mSpecialValues.SpecialLinearLayoutOrientation.Horizontal;
    private backGroundColor: string = "#ffffff";
    private children: mWidget.Widget[] = [];

    constructor(id, layoutWidth, LayoutHeight) {
        super(id, layoutWidth, LayoutHeight, mWidgetTypes.WidgetType.LinearLayout);
    }


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

    public addChild(child: mWidget.Widget) {
        this.children.push(child);
    }

    public deleteChild(childId: number) {
        var indexToDel = -1;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].Id == childId) {
                indexToDel = i;
                break;
            }
        }
        this.children.splice(indexToDel, 1);
    }

    public swapChildren(firstChildId: number, secondChildId: number) {
        var firstIndex = -1;
        var secondIndex = -1;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].Id == firstChildId) {
                firstIndex = i;
            }
            if (this.children[i].Id == secondChildId) {
                secondIndex = i;
            }
            if (firstIndex != -1 && secondIndex != -1) {
                break;
            }
        }
        var temp: mWidget.Widget = this.children[firstIndex];
        this.children[firstIndex] = this.children[secondIndex];
        this.children[secondIndex] = temp;
    }
}

