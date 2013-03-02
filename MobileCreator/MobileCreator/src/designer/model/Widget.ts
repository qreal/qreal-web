/// <reference path="../../../lib/jquery.d.ts" />

export class Widget {
    private layoutWidth;
    private layoutHeight;
    private control;
    private controlType;

    constructor(layoutWidth, layoutHeight, control: JQuery, controlType) {
        this.layoutWidth = layoutWidth;
        this.layoutHeight = layoutHeight;
        this.control = control;
        this.controlType = controlType;
    }
}