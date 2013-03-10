import mElementPreferences = module("designer/ElementPreferences");

export class TextViewPreferences extends mElementPreferences.ElementPreferences {
    private layoutMarginTop: number;
    get LayoutMarginTop() {
        return this.layoutMarginTop;
    }
    set LayoutMarginTop(layoutMarginTop: number) {
        this.layoutMarginTop = layoutMarginTop;
    }
    private padding: number;
    get Padding() {
        return this.padding;
    }
    set Padding(padding: number) {
        this.padding = padding;
    }
    private text: string;
    get Text() {
        return this.text;
    }
    set Text(text: string) {
        this.text = text;
    }
    private textSize: number;
    get TextSize() {
        return this.textSize;
    }
    set TextSize(textSize: number) {
        this.textSize = textSize;
    }
}