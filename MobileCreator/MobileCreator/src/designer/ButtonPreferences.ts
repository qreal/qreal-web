import mElementPreferences = module("designer/ElementPreferences");

export class ButtonPreferences extends mElementPreferences.ElementPreferences {
    private layoutMarginTop: number;
    get LayoutMarginTop() {
        return this.layoutMarginTop;
    }
    set LayoutMarginTop(layoutMarginTop: number) {
        this.layoutMarginTop = layoutMarginTop;
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
    private buttonId: string;
    get ButtonId() {
        return this.buttonId;
    }
    set ButtonId(buttonId: string) {
        this.buttonId = buttonId;
    }
    private onClickHandler: string;
    get OnClickHandler() {
        return this.onClickHandler;
    }
    set OnClickHandler(onClickHandler: string) {
        this.onClickHandler = onClickHandler;
    }
}