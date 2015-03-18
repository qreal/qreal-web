class WorldModelImpl implements WorldModel {
    drawMode: number = 0;
    paper: RaphaelPaper;
    currentElement = null;

    constructor($scope) {
        $scope.vm = this;
        var worldModel = this;
        $(document).ready(function(){
            worldModel.paper = Raphael("stage", "100%", "100%");
            $(worldModel.paper.canvas).attr("id", "paper");

            var wall_pattern = '<pattern id="wall_pattern" patternUnits="userSpaceOnUse" width="85" height="80">\
                                        <image xlink:href="images/2dmodel/2d_wall.png" width="85" height="80" />\
                                    </pattern>';
            $("body").append('<svg id="dummy" style="display:none"><defs>' + wall_pattern + '</defs></svg>');
            $("#paper defs").append($("#dummy pattern"));
            $("#dummy").remove();

            var shape;
            var isDrawing: boolean = false;
            var startDrawPoint;

            $("#stage").mousedown(function(e) {
                switch (worldModel.drawMode) {
                    case 1:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new LineItemImpl(worldModel, x, y, x, y, width, color);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break
                    case 2:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        shape = new WallItemImpl(worldModel, x, y, x, y);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break
                    case 3:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new PencilItemImpl(worldModel, x, y, width, color);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break
                    case 4:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        startDrawPoint = {
                            "x": x,
                            "y": y
                        }
                        shape = new EllipseItemImpl(worldModel, x, y, width, color);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break
                    default:
                }
            });

            $("#stage").mousemove(function(e) {
                if (isDrawing) {
                    switch (worldModel.drawMode) {
                        case 1:
                        case 2:
                            var position = worldModel.getMousePosition(e);
                            var x = position.x;
                            var y = position.y;
                            shape.updateEnd(x, y);
                            break
                        case 3:
                            var position = worldModel.getMousePosition(e);
                            var x = position.x;
                            var y = position.y;
                            shape.updatePath(x, y);
                            break
                        case 4:
                            var position = worldModel.getMousePosition(e);
                            var x = position.x;
                            var y = position.y;
                            shape.updateCorner(startDrawPoint.x, startDrawPoint.y, x, y);
                            break
                        default:
                    }
                }
            });

            $("#stage").mouseup(function(e) {
                if (isDrawing) {
                    isDrawing = false;
                } else {
                    if (e.target.nodeName === "svg") {
                        if (worldModel.currentElement) {
                            worldModel.currentElement.hideHandles();
                            worldModel.currentElement = null;
                        }
                    }
                }
            });
        });
    }

    getMousePosition(e) {
        var offset = $("#stage").offset();
        var position = {
            x : e.pageX - offset.left,
            y : e.pageY - offset.top
        }
        return position;
    }

    setDrawLineMode(): void {
        this.drawMode = 1;
    }

    setDrawWallMode(): void {
        this.drawMode = 2;
    }

    setDrawPencilMode(): void {
        this.drawMode = 3;
    }

    setDrawEllipseMode(): void {
        this.drawMode = 4;
    }

    getDrawMode(): number {
        return this.drawMode;
    }

    setNoneMode(): void {
        this.drawMode = 0;
    }

    getPaper(): RaphaelPaper {
        return this.paper;
    }

    setCurrentElement(element) {
        if (this.currentElement) {
            this.currentElement.hideHandles();
        }
        this.currentElement = element;
        element.showHandles();
    }
}