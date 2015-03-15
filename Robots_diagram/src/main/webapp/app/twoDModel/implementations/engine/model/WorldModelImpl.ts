class WorldModelImpl implements WorldModel {
    drawMode: number = 0;
    paper: RaphaelPaper;

    constructor($scope) {
        $scope.vm = this;
        var controller = this;
        $(document).ready(function(){
            controller.paper = Raphael("stage", "100%", "100%");
            $(controller.paper.canvas).attr("id", "paper");

            var wall_pattern = '<pattern id="wall_pattern" patternUnits="userSpaceOnUse" width="85" height="80">\
                                        <image xlink:href="images/2dmodel/2d_wall.png" width="85" height="80" />\
                                    </pattern>';
            $("body").append('<svg id="dummy" style="display:none"><defs>' + wall_pattern + '</defs></svg>');
            $("#paper defs").append($("#dummy pattern"));
            $("#dummy").remove();

            var shape;
            var isDrawing: boolean = false;

            $("#stage").mousedown(function(e) {
                switch (controller.drawMode) {
                    case 1:
                        var offset = $("#stage").offset();
                        var x = e.pageX - offset.left;
                        var y = e.pageY - offset.top;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new LineItemImpl(controller, x, y, x, y, width, color);
                        isDrawing = true;
                        break
                    case 2:
                        var offset = $("#stage").offset();
                        var x = e.pageX - offset.left;
                        var y = e.pageY - offset.top;
                        shape = new WallItemImpl(controller, x, y, x, y);
                        isDrawing = true;
                        break
                    default:
                }
            });

            $("#stage").mousemove(function(e) {
                if (isDrawing) {
                    switch (controller.drawMode) {
                        case 1:
                        case 2:
                            var offset = $("#stage").offset();
                            var x = e.pageX - offset.left;
                            var y = e.pageY - offset.top;
                            shape.updateEnd(x, y);
                        default:
                    }
                }
            });

            $("#stage").mouseup(function(e) {
                if (isDrawing) {
                    isDrawing = false;
                }
            });
        });
    }

    setDrawLineMode(): void {
        this.drawMode = 1;
    }

    setDrawWallMode(): void {
        this.drawMode = 2;
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
}