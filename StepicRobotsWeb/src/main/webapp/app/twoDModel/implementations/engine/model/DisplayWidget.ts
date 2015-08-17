class DisplayWidget {

    private width: number = 218;
    private height: number = 274;
    private smileImg: HTMLImageElement;
    private sadSmileImg: HTMLImageElement;
    private context: any;

    constructor() {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("display");
        this.context = canvas.getContext("2d");
        this.smileImg = new Image();
        this.smileImg.src = "/StepicRobotsWeb/images/2dmodel/trikKit/smile.png";
        this.sadSmileImg = new Image();
        this.sadSmileImg.src = "/StepicRobotsWeb/images/2dmodel/trikKit/sadSmile.png";
    }

    drawSmile(): void {
        this.context.drawImage(this.smileImg, 0, 0, this.width, this.height);
    }

    drawSadSmile(): void {
        this.context.drawImage(this.sadSmileImg, 0, 0, this.width, this.height);
    }

    show(): void {
        $("#menu_button").hide();
        $("#close_display").show();
        $("#controller").show();
        $("#display").show();
    }

    hide(): void {
        $("#close_display").hide();
        $("#display").hide();
        $("#controller").hide();
        $("#menu_button").show();
    }
}