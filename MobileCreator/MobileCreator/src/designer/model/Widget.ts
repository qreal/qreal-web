/// <reference path="../../../lib/jquery.d.ts" />

export class Widget {
    private layoutWidth;
    private layoutHeight;


    constructor(layoutWidth, layoutHeight, control: JQuery, controlType) {
        this.layoutWidth = layoutWidth;
        this.layoutHeight = layoutHeight;
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