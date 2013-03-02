import mWidget = module("designer/model/Widget");

export interface Form {
    toXML(): string;
    getBaseWidget(): mWidget.Widget;
    getId(): number;
}
