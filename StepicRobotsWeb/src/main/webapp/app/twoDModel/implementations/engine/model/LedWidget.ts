class LedWidget {

    private color: string;

    constructor() {
        this.color = "red";
    }

    setColor(color: string): void {
        this.color = color;
        $("#led").css("background", color);
    }

    getColor(): string {
        return this.color;
    }

    show(): void {
        $("#led").show();
    }

    hide(): void {
        $("#led").hide();
    }

}