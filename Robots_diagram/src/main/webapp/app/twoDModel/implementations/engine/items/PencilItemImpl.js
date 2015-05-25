var PencilItemImpl = (function () {
    function PencilItemImpl(worldModel, xStart, yStart, width, color) {
        this.pathArray = [];
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
                this.transformation = this.transform();
                worldModel.setCurrentElement(pencilItem);
            }
            return this;
        }, movePath = function (dx, dy) {
            if (!worldModel.getDrawMode()) {
                this.transform(this.transformation + "T" + dx + "," + dy);
            }
            return this;
        }, upPath = function () {
            return this;
        };
        pencilItem.path.drag(movePath, startPath, upPath);
    }
    PencilItemImpl.prototype.updatePath = function (x, y) {
        this.pathArray[this.pathArray.length] = ["L", x, y];
        this.path.attr({ path: this.pathArray });
    };
    PencilItemImpl.prototype.getPath = function () {
        return this.path;
    };
    PencilItemImpl.prototype.hideHandles = function () {
    };
    PencilItemImpl.prototype.showHandles = function () {
    };
    PencilItemImpl.prototype.remove = function () {
        this.path.remove();
    };
    return PencilItemImpl;
})();
//# sourceMappingURL=PencilItemImpl.js.map