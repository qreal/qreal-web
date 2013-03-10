export class ElementPreferences {
    public static FillParent = -1;
    public static WrapContent = -2;
    private width;
    get Width() {
        return this.width;
    }
    set Width(width: number) {
        this.width = width;
    }
    private height;
    get Height() {
        return this.height;
    }
    set Height(height: number) {
        this.height = height;
    }

}