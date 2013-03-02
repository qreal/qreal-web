import mWidgetTypes = module("designer/model/WidgetTypes");

export class Widget {
    private layoutWidth;
    private layoutHeight;
    private id;
    private widgetType;

    constructor(id: number, layoutWidth, layoutHeight, widgetType?) {
        this.layoutWidth = layoutWidth;
        this.layoutHeight = layoutHeight;
        this.id = id;
        this.widgetType = widgetType || mWidgetTypes.WidgetType.Unknown;
    }

    get WidgetType() {
        return this.widgetType;
    }

    get Id() {
        return this.id;
    }

    get LayoutWidth() {
        return this.layoutWidth;
    }

    set LayoutWidth(layoutWidth) {
        this.layoutWidth = LayoutWidth;
    }

    get LayoutHeight() {
        return this.layoutWidth;
    }

    set LayoutHeight(layoutHeight) {
        this.layoutWidth = LayoutHeight;
    }
}