export class WidgetView {
    private modelWidgetId;
    private layoutWidth;
    private layoutHeight;

    constructor(id: number, layoutWidth, layoutHeight) {
        this.layoutWidth = layoutWidth;
        this.layoutHeight = layoutHeight;
        this.modelWidgetId = id;
    }

    get ModelWidgetId() {
        return this.modelWidgetId;
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