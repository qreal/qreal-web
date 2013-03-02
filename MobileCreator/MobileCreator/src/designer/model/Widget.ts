/// <reference path="../../../lib/jquery.d.ts" />

export class Widget {
    private layoutWidth;
    private layoutHeight;
    private id;

    constructor(id: number, layoutWidth, layoutHeight) {
        this.layoutWidth = layoutWidth;
        this.layoutHeight = layoutHeight;
        this.id = id;
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