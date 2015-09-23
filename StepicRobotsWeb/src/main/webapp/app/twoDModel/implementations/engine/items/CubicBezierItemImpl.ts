class CubicBezierItemImpl implements CubicBezierItem {

    private path: RaphaelPath;
    private worldModel: WorldModel;

    constructor(worldModel: WorldModel, xStart: number, yStart: number, xEnd: number, yEnd: number,
                cp1X: number, cp1Y: number, cp2X: number, cp2Y: number,
                width: number, color: string) {
        var paper: RaphaelPaper = worldModel.getPaper();
        this.worldModel = worldModel;
        this.path = paper.path("M " + xStart + "," + yStart + " C " + cp1X + "," + cp1Y + " " + cp2X + "," + cp2Y +
            " " + xEnd + "," + yEnd);
        this.path.toBack();
        this.path.attr({
            "stroke": color,
            "stroke-width": width
        });
    }

    getPath(): RaphaelPath {
        return this.path;
    }

    updateStart(x: number, y: number): void {
    }

    updateEnd(x: number, y: number): void {
    }

    updateCP1(x: number, y: number): void {
    }

    updateCP2(x: number, y: number): void {
    }

    remove(): void {
        this.path.remove();
    }

    showHandles(): void {
    }

    hideHandles(): void {
    }
}