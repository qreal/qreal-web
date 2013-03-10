import mElementPreferences = module("designer/ElementPreferences");

export class ImageViewPreferences extends mElementPreferences.ElementPreferences {
    private layoutMarginTop: number;
    get LayoutMarginTop() {
        return this.layoutMarginTop;
    }
    set LayoutMarginTop(layoutMarginTop: number) {
        this.layoutMarginTop = layoutMarginTop;
    }
    private layoutGravity: string;
    get LayoutGravity() {
        return this.layoutGravity;
    }
    set LayoutGravity(layoutGravity: string) {
        this.layoutGravity = layoutGravity;
    }
    private src: string;
    get Src() {
        return this.src;
    }
    set Src(src: string) {
        this.src = src;
    }
    private imageURL: string;
    get ImageURL() {
        return this.imageURL;
    }
    set ImageURL(imageURL: string) {
        this.imageURL = imageURL;
    }
}