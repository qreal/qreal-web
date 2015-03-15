class EllipseItemImpl implements EllipseItem {
    private ellipse: RaphaelElement;

    constructor(worldModel: WorldModel, xStart: number, yStart: number, xEnd: number, yEnd: number, width: number, color: string) {
        var paper = worldModel.getPaper();
        this.ellipse = paper.ellipse(xStart, yStart, 0, 0);
        this.ellipse.attr({
            fill: "transparent",
            cursor: "pointer",
            "stroke": color,
            "stroke-width": width
        })

        var thisEllipse = this.ellipse;

        var startEllipse = function () {
                if (!worldModel.getDrawMode()) {
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");
                }
                return this;
            },
            moveEllipse = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    var newX = this.cx + dx;
                    var newY = this.cy + dy;
                    thisEllipse.attr({cx: newX, cy: newY});
                }
                return this;
            },
            upEllipse = function () {
                return this;
            };

        thisEllipse.drag(moveEllipse, startEllipse, upEllipse);
    }

    updateCorner(oppositeCornerX: number, oppositeCornerY: number, x: number, y: number): void {
        var newCx = (oppositeCornerX + x) / 2;
        var newCy = (oppositeCornerY + y) / 2;
        var newRx = Math.abs(x - oppositeCornerX) / 2;
        var newRy = Math.abs(y - oppositeCornerY) / 2;
        this.ellipse.attr({"cx": newCx , "cy": newCy});
        this.ellipse.attr({"rx": newRx, "ry": newRy});
    }
}