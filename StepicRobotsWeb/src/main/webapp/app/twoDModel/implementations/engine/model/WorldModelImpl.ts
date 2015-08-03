class WorldModelImpl implements WorldModel {
    private drawMode: number = 0;
    private paper: RaphaelPaper;
    private currentElement: AbstractItem = null;
    private colorFields: ColorFieldItem[] = [];
    private wallItems: WallItem[] = [];
    private regions: RegionItem[] = [];

    constructor() {
        this.paper = Raphael("twoDModel_stage", 3000, 3000);

        $(this.paper.canvas).attr("id", "twoDModel_paper");
        $(this.paper.canvas).css('overflow', 'auto');

        this.paper.setViewBox(0, 0, 3000, 3000, true);
        this.paper.canvas.setAttribute('preserveAspectRatio', 'none');
        $('#twoDModel_paper').attr('width', 2000).attr('height', 2000);

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
        var exPositions = this.getExtendedPositions(xStart, yStart, xEnd, yEnd, WallItemImpl.getWidth());
        var wall = new WallItemImpl(this, exPositions.start.x, exPositions.start.y,
            exPositions.end.x, exPositions.end.y);
        wall.hideHandles();
        this.wallItems.push(wall);
    }

    addLine(xStart: number, yStart: number, xEnd: number, yEnd: number, width: number, color: string) {
        var exPositions = this.getExtendedPositions(xStart, yStart, xEnd, yEnd, width);
        var line = new LineItemImpl(this, exPositions.start.x, exPositions.start.y,
            exPositions.end.x, exPositions.end.y, width, color);
        line.hideHandles();
        this.colorFields.push(line);
    }

    private getExtendedPositions(xStart: number, yStart: number, xEnd: number,
                         yEnd: number, width: number): {start: TwoDPosition, end: TwoDPosition} {
        var extension = width / 2;
        var cos = Math.abs(xEnd - xStart) / this.getLenght(xStart, yStart, xEnd, yEnd);
        var extensionX = extension * cos;
        var sin = Math.abs(yEnd - yStart) / this.getLenght(xStart, yStart, xEnd, yEnd);
        var extensionY = extension * sin;

        var exStartX: number;
        var exStartY: number;
        var exEndX: number;
        var exEndY: number;

        if (xStart < xEnd) {
            exStartX = xStart - extensionX;
            exEndX = xEnd + extensionX;
        } else {
            exStartX = xStart + extensionX;
            exEndX = xEnd - extensionX;
        }

        if (yStart < yEnd) {
            exStartY = yStart - extensionY;
            exEndY = yEnd + extensionY;
        } else {
            exStartY = yStart + extensionY;
            exEndY = yEnd - extensionY;
        }
        return { start: new TwoDPosition(exStartX, exStartY), end: new TwoDPosition(exEndX, exEndY) };
    }

    private getLenght(xStart: number, yStart: number, xEnd: number, yEnd: number): number {
        return Math.sqrt(this.sqr(xEnd - xStart) + this.sqr((yEnd - yStart)));
    }

    private sqr(x: number): number {
        return x * x;
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
        var regions = xml.getElementsByTagName("region");

        if (regions) {
            for (var i = 0; i < regions.length; i++) {
                var type = regions[i].getAttribute("type");

                switch (type) {
                    case "rectangle":
                        if (regions[i].getAttribute("visible") == "true") {
                            var region = new RectangularRegion(this);
                            region.deserialize(regions[i], offsetX, offsetY);
                            this.regions.push(region);
                            break;
                        }
                    default:
                }
            }
        }

        var walls = xml.getElementsByTagName("wall");

        if (walls) {
            for (var i = 0; i < walls.length; i++) {
                var beginPosStr: string = walls[i].getAttribute('begin');
                var beginPos = this.parsePositionString(beginPosStr);
                var endPosStr: string = walls[i].getAttribute('end');
                var endPos = this.parsePositionString(endPosStr);

                this.addWall(beginPos.x + offsetX, beginPos.y + offsetY, endPos.x + offsetX, endPos.y + offsetY);
            }
        }

        var lines = xml.getElementsByTagName("colorFields")[0].getElementsByTagName("line");

        if (lines) {
            for (var i = 0; i < lines.length; i++) {
                var beginPosStr:string = lines[i].getAttribute('begin');
                var beginPos = this.parsePositionString(beginPosStr);
                var endPosStr:string = lines[i].getAttribute('end');
                var endPos = this.parsePositionString(endPosStr);
                var width:number = parseInt(lines[i].getAttribute('stroke-width'));
                var color:string = lines[i].getAttribute('stroke');

                this.addLine(beginPos.x + offsetX, beginPos.y + offsetY,
                    endPos.x + offsetX, endPos.y + offsetY, width, color);
            }
        }
    }
}