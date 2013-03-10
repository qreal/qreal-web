import mElementPreferences = module("designer/ElementPreferences");

export class LinearLayoutPreferences extends mElementPreferences.ElementPreferences {
    public static Vertical = 0;
    public static Horizontal = 1;
    private orientation: number;
    get Orientation() {
        return this.orientation;
    }
    set Orientation(orientation: number) {
        this.orientation = orientation;
    }
    private background: string;
    get Background() {
        return this.background;
    }
    set Background(background: string) {
        this.background = background;
    }
}