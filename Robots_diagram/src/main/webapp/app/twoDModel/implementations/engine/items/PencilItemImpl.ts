class PencilItemImpl {
    private path: RaphaelPath;
    private pathArray = new Array();

    constructor(worldModel: WorldModel, xStart: number, yStart: number, width: number, color: string) {
        var paper = worldModel.getPaper();
        this.pathArray[0] = ["M", xStart, yStart];
        this.path = paper.path(this.pathArray);
        this.path.attr({
            cursor: "pointer",
            "stroke": color,
            "stroke-width": width
        });

        var pencilItem = this;

        var startPath = function () {
                if (!worldModel.getDrawMode()) {
                    this.ox = this.attr("x");
                    this.oy = this.attr("y");
                    worldModel.setCurrentElement(pencilItem);
                }
                return this;
            },
            movePath = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    var trans_x = dx - this.ox;
                    var trans_y = dy - this.oy;

                    this.transform("...T" + [trans_x, trans_y]);
                    this.ox = dx;
                    this.oy = dy;
                }
                return this;
            },
            upPath = function () {
                return this;
            };

        pencilItem.path.drag(movePath, startPath, upPath);
    }

    updatePath(x: number, y: number): void {
        this.pathArray[this.pathArray.length] =["L", x, y];
        this.path.attr({path: this.pathArray});
    }

    getPath(): RaphaelPath {
        return this.path;
    }

    hideHandles(): void {
    }
    showHandles(): void {
    }

    remove(): void {
        this.path.remove();
    }
}