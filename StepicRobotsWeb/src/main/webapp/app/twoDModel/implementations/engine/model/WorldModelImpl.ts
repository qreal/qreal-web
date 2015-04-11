class WorldModelImpl implements WorldModel {
    private drawMode: number = 0;
    private paper: RaphaelPaper;
    private currentElement = null;
    private colorFields: ColorFieldItem[] = [];
    private wallItems: WallItem[] = [];

    constructor() {
        this.paper = Raphael("twoDModel_stage", 2000, 2000);
        $(this.paper.canvas).attr("id", "twoDModel_paper");
        $(this.paper.canvas).css('overflow', 'auto');

        var wall_pattern = '<pattern id="wall_pattern" patternUnits="userSpaceOnUse" width="85" height="80">\
                                        <image xlink:href="images/2dmodel/2d_wall.png" width="85" height="80" />\
                                    </pattern>';
        $("body").append('<svg id="dummy" style="display:none"><defs>' + wall_pattern + '</defs></svg>');
        $("#twoDModel_paper defs").append($("#dummy pattern"));
        $("#dummy").remove();

        var worldModel = this;
        $(document).ready(function(){
            var shape;
            var isDrawing: boolean = false;
            var startDrawPoint;

            $("#twoDModel_stage").mousedown(function(e) {
                switch (worldModel.drawMode) {
                    case 0:
                        if (e.target.nodeName === "svg") {
                            if (worldModel.currentElement) {
                                worldModel.currentElement.hideHandles();
                                worldModel.currentElement = null;
                            }
                        }
                        break;
                    case 1:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        var width = $("#pen_width_spinner").val();
                        var color = $("#pen_color_dropdown").val();
                        shape = new LineItemImpl(worldModel, x, y, x, y, width, color);
                        worldModel.colorFields.push(shape);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break
                    case 2:
                        var position = worldModel.getMousePosition(e);
                        var x = position.x;
                        var y = position.y;
                        shape = new WallItemImpl(worldModel, x, y, x, y);
                        worldModel.wallItems.push(shape);
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
                        worldModel.colorFields.push(shape);
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
                        worldModel.colorFields.push(shape);
                        worldModel.setCurrentElement(shape);
                        isDrawing = true;
                        break
                    default:
                }
            });

            $("#twoDModel_stage").mousemove(function(e) {
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

            $("#twoDModel_stage").mouseup(function(e) {
                if (isDrawing) {
                    isDrawing = false;
                }
            });
        });
    }

    addWall(xStart: number, yStart: number, xEnd: number, yEnd: number): void {
        var wall = new WallItemImpl(this, xStart, yStart, xEnd, yEnd);
        wall.hideHandles();
        this.wallItems.push(wall);
    }

    getMousePosition(e) {
        var offset = $("#twoDModel_stage").offset();
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

    setCurrentElement(element): void {
        if (this.currentElement) {
            this.currentElement.hideHandles();
        }
        this.currentElement = element;
        element.showHandles();
    }

    clearPaper(): void {
        while (this.wallItems.length) {
            var wallItem = this.wallItems.pop();
            wallItem.remove();
        }

        while (this.colorFields.length) {
            var item = this.colorFields.pop();
            item.remove();
        }
    }

    private parsePositionString(positionStr: string): TwoDPosition {
        var splittedStr = positionStr.split(":");
        var x = parseFloat(splittedStr[0]);
        var y = parseFloat(splittedStr[1]);
        return new TwoDPosition(x, y);
    }

    deserialize(xml, offsetX: number, offsetY: number) {
        var walls = xml.getElementsByTagName("wall");

        for (var i = 0; i < walls.length; i++) {
            var beginPosStr: string = walls[i].getAttribute('begin');
            var beginPos = this.parsePositionString(beginPosStr);
            var endPosStr: string = walls[i].getAttribute('end');
            var endPos = this.parsePositionString(endPosStr);

            this.addWall(beginPos.x + offsetX, beginPos.y + offsetY, endPos.x + offsetX, endPos.y + offsetY);
        }

        var regions = xml.getElementsByTagName("region");

        for (var i = 0; i < regions.length; i++) {
            var x = parseFloat(regions[i].getAttribute('x'));
            var y = parseFloat(regions[i].getAttribute('y'));
        }

        var robots = xml.getElementsByTagName("robot");

        for (var i = 0; i < robots.length; i++) {
            var posString = robots[i].getAttribute('position');
            var pos = this.parsePositionString(posString);

            var sensors = robots[i].getElementsByTagName("sensor");
            for (var j = 0; j < sensors.length; j++) {
                var posString = sensors[j].getAttribute('position');
                var pos = this.parsePositionString(posString);
            }

            var startPosition = robots[i].getElementsByTagName("startPosition")[0];
            var x = parseFloat(startPosition.getAttribute('x'));
            var y = parseFloat(startPosition.getAttribute('y'));
        }
    }
}