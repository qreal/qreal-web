import mWidget = module("designer/model/Widget");
import mSpecialValues = module("designer/model/SpecialValues")
import mWidgetTypes = module("designer/model/WidgetTypes");

export class Button extends mWidget.Widget {
    private text: string = "";
    private idName: string = "";
    private textSize: string = "15px";
    private layoutMarginTop: string = "10px";
    private onClick: string = "";

    constructor(id, layoutWidth, LayoutHeight) {
        super(id, layoutWidth, LayoutHeight, mWidgetTypes.WidgetType.Button);
    }


    get Text() {
        return this.text;
    }

    set Text(text: string) {
        this.text = text;
    }

    get IdName() {
        return this.idName;
    }

    set IdName(idName: string) {
        this.idName = idName;
    }

    get TextSize() {
        return this.textSize;
    }

    set TextSize(textSize: string) {
        this.textSize = textSize;
    }

    get LayoutMarginTop() {
        return this.layoutMarginTop;
    }

    set LayoutMarginTop(layoutMarginTop: string) {
        this.layoutMarginTop = layoutMarginTop;
    }

    get OnClick() {
        return this.onClick;
    }

    set OnClick(onClick: string) {
        this.onClick = onClick;
    }
}

