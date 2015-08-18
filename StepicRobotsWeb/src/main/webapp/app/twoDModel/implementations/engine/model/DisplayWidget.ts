class DisplayWidget {

    private width: number = 218;
    private height: number = 274;
    private smileImg: HTMLImageElement;
    private sadSmileImg: HTMLImageElement;
    private context: any;
    private ledWidget: LedWidget;
    private isSmiles: boolean;
    private isSadSmiles: boolean;

    constructor() {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("display");
        this.context = canvas.getContext("2d");
        this.smileImg = new Image();
        this.smileImg.src = "/StepicRobotsWeb/images/2dmodel/trikKit/smile.png";
        this.sadSmileImg = new Image();
        this.sadSmileImg.src = "/StepicRobotsWeb/images/2dmodel/trikKit/sadSmile.png";
        this.ledWidget = new LedWidget();
        this.isSmiles = false;
        this.isSadSmiles = false;
    }

    drawSmile(): void {
        this.isSmiles = true;
        this.context.drawImage(this.smileImg, 0, 0, this.width, this.height);
    }

    drawSadSmile(): void {
        this.isSmiles = true;
        this.context.drawImage(this.sadSmileImg, 0, 0, this.width, this.height);
    }

    clearSmile(): void {
        this.isSmiles = false;
        this.redraw();
    }

    clearSadSmile(): void {
        this.isSadSmiles = false;
        this.redraw();
    }

    setLedColor(color: string): void {
        this.ledWidget.setColor(color);
    }

    reset(): void {
        this.isSmiles = false;
        this.isSadSmiles = false;
        this.clearScreen();
        this.ledWidget.reset()
    }

    redraw(): void {
        this.clearScreen();
        if (this.isSmiles) {
            this.drawSmile();
        }
        if (this.isSadSmiles) {
            this.drawSadSmile();
        }
    }

    clearScreen(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    show(): void {
        $("#menu_button").hide();
        $("#close_display").show();
        $("#controller").show();
        $("#display").show();
        this.ledWidget.show();
    }

    hide(): void {
        $("#close_display").hide();
        $("#display").hide();
        $("#controller").hide();
        $("#menu_button").show();
        this.ledWidget.hide();
    }
}