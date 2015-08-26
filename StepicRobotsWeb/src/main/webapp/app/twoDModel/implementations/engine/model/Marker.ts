class Marker {

    private paper: RaphaelPaper;
    private down: boolean;
    private color: string;
    private position: TwoDPosition;
    private robotCenter: TwoDPosition
    private direction: number;
    private width: number = 5;
    private height: number = 6;
    private pointSet: RaphaelSet;

    constructor(paper: RaphaelPaper, position: TwoDPosition, robotCenter: TwoDPosition) {
        this.paper = paper;
        this.down = false;
        this.color = "#000000";
        this.position = position;
        this.robotCenter = robotCenter;
        this.direction = 0;
        this.pointSet = paper.set();
    }

    setPosition(position: TwoDPosition, robotCenter: TwoDPosition) {
        this.position = position;
        this.robotCenter = robotCenter;
    }

    setDirection(angle: number) {
        this.direction = angle;
    }

    setColor(color: string) {
        this.color = color;
    }

    isDown(): boolean {
        return this.down;
    }

    setDown(down: boolean): void {
        this.down = down;
    }

    clear(): void {
        while(this.pointSet.length) {
            this.pointSet.pop().remove();
        }
    }

    drawPoint(): void {
        var point = this.paper.rect(this.position.x - 0.5, this.position.y - this.height / 2, this.width, this.height);
        point.attr({ "stroke-width": 0, "fill": this.color });
        point.transform("R" + this.direction + "," + this.robotCenter.x + "," + this.robotCenter.y);
        point.toBack();
        this.pointSet.push(point);
    }

}