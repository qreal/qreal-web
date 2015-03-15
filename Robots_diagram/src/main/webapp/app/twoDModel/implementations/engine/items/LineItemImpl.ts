class LineItemImpl implements LineItem {
    private path: RaphaelPath;
    private handleStart: RaphaelElement;
    private handleEnd: RaphaelElement;
    private pathArray;

    constructor(worldModel: WorldModel, xStart: number, yStart: number, xEnd: number, yEnd: number, width: number, color: string) {
        var paper = worldModel.getPaper();
        this.path = paper.path("M" + xStart + " " + yStart + " L" + xEnd + " " + yEnd);
        this.path.attr({
            cursor: "pointer",
            "stroke": color,
            "stroke-width": width
        });
        this.pathArray = this.path.attr("path");

        var handleRadius: number = 10;

        this.handleStart = paper.circle(xStart, yStart, handleRadius).attr({
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        });

        this.handleEnd = paper.circle(xEnd, yEnd, handleRadius).attr({
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        });

        var line = this;

        var start = function () {
                if (!worldModel.getDrawMode()) {
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");
                }
                return this;
            },
            moveStart = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    var newX = this.cx + dx;
                    var newY = this.cy + dy;
                    line.updateStart(newX, newY)
                }
                return this;
            },
            moveEnd = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    var newX = this.cx + dx;
                    var newY = this.cy + dy;
                    line.updateEnd(newX, newY);
                }
                return this;
            },
            up = function () {
                return this;
            };

        line.handleStart.drag(moveStart, start, up);
        line.handleEnd.drag(moveEnd, start, up);


        var startPath = function () {
                if (!worldModel.getDrawMode()) {
                    this.startX = line.pathArray[0][1];
                    this.startY = line.pathArray[0][2]
                    this.endX = line.pathArray[1][1];
                    this.endY = line.pathArray[1][2]
                    this.ox = this.attr("x");
                    this.oy = this.attr("y");
                }
                return this;
            },
            movePath = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    var trans_x = dx - this.ox;
                    var trans_y = dy - this.oy;

                    line.pathArray[0][1] = this.startX + dx;
                    line.pathArray[0][2] = this.startY + dy;
                    line.pathArray[1][1] = this.endX + dx;
                    line.pathArray[1][2] = this.endY + dy;
                    line.path.attr({path: line.pathArray});

                    this.ox = dx;
                    this.oy = dy;

                    var hStartX = line.handleStart.attr("cx") + trans_x;
                    var hStartY = line.handleStart.attr("cy") + trans_y;
                    var hEndX = line.handleEnd.attr("cx") + trans_x;
                    var hEndY = line.handleEnd.attr("cy") + trans_y;

                    line.handleStart.attr({cx: hStartX, cy: hStartY});
                    line.handleEnd.attr({cx: hEndX, cy: hEndY});
                }
                return this;
            },
            upPath = function () {
                return this;
            };

        line.path.drag(movePath, startPath, upPath);
    }

    getPath(): RaphaelPath {
        return this.path;
    }

    updateStart(x: number, y: number): void {
        this.pathArray[0][1] = x;
        this.pathArray[0][2] = y;
        this.path.attr({path: this.pathArray});
        this.handleStart.attr({cx: x, cy: y});
    }

    updateEnd(x: number, y: number): void {
        this.pathArray[1][1] = x;
        this.pathArray[1][2] = y;
        this.path.attr({path: this.pathArray});
        this.handleEnd.attr({cx: x, cy: y});
    }
}