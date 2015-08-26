class Marker {

    private context: any;
    private down: boolean;
    private position: TwoDPosition;
    private robotCenter: TwoDPosition
    private direction: number;
    private height: number = 6;

    constructor(position: TwoDPosition, robotCenter: TwoDPosition) {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("twoDModelCanvas");
        this.context = canvas.getContext("2d");
        this.context.scale(2/3, 2/3);

        this.down = false;
        this.context.fillStyle = "#000000";
        this.position = position;
        this.robotCenter = robotCenter;
        this.direction = 0;
    }

    setPosition(position: TwoDPosition, robotCenter: TwoDPosition) {
        this.position = position;
        this.robotCenter = robotCenter;
    }

    setDirection(angle: number) {
        this.direction = angle;
    }

    setColor(color: string) {
        this.context.fillStyle = color;
    }

    isDown(): boolean {
        return this.down;
    }

    setDown(down: boolean): void {
        this.down = down;
    }

    clear(): void {
        this.context.clearRect(0, 0, 2000, 2000);
    }

    drawPoint(): void {
        this.context.save();
        this.context.translate(this.robotCenter.x, this.robotCenter.y);
        this.context.rotate(this.direction * Math.PI / 180);
        this.context.translate(-this.robotCenter.x, -this.robotCenter.y);
        this.context.fillRect(this.position.x - 0.5, this.position.y - this.height / 2, 5, this.height);
        this.context.restore();
    }

}