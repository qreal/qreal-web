class SonarSensorItem extends SensorItem {
    private scanningRegion: RaphaelPath;
    private sonarRange = 255;
    private regionStartX: number;
    private regionStartY: number;
    private rotateHandle: RaphaelElement;
    private centerX: number;
    private centerY: number;
    private startCx: number;
    private startCy: number;
    private regionTransformationString = "";

    constructor(worldModel: WorldModel, position: TwoDPosition) {
        super(worldModel, position);
        var paper: RaphaelPaper = worldModel.getPaper();
        this.image = paper.image("images/2dmodel/twoDIrRangeSensor.svg", position.x, position.y, this.width, this.height);

        this.regionStartX = position.x + this.width / 2;
        this.regionStartY = position.y + this.height / 2

        var regAngle = 20;
        var halfRegAngleInRad = regAngle / 2 * (Math.PI / 180)

        var rangeInPixels = this.sonarRange * Constants.pixelsInCm;

        var regionTopX = this.regionStartX + Math.cos(halfRegAngleInRad) * rangeInPixels;
        var regionTopY = this.regionStartY - Math.sin(halfRegAngleInRad) * rangeInPixels;

        var regionBottomX = regionTopX;
        var regionBottomY = this.regionStartY + Math.sin(halfRegAngleInRad) * rangeInPixels;

        this.scanningRegion = paper.path("M" + this.regionStartX + "," + this.regionStartY +
            "L" + regionTopX + "," + regionTopY +
            "Q" + (this.regionStartX + rangeInPixels) + "," + this.regionStartY + " " + regionBottomX + "," + regionBottomY +
            "Z");
        this.scanningRegion.attr({fill: "#c5d0de", stroke: "#b1bbc7", opacity: 0.5});

        this.centerX = position.x + this.width / 2;
        this.centerY = position.y + this.height / 2;

        this.startCx = this.centerX;
        this.startCy = this.centerY;

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotateHandle = paper.circle(position.x + this.width + 20,
            position.y + this.height / 2, handleRadius).attr(handleAttrs);

        var sonarItem = this;

        var startHandle = function () {
                if (!worldModel.getDrawMode()) {
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");

                    this.rotation = sonarItem.image.matrix.split().rotate;
                }
                return this;
            },
            moveHandle = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    var newX = this.cx + dx;
                    var newY = this.cy + dy;
                    var offsetX = newX - sonarItem.centerX;
                    var offsetY = newY - sonarItem.centerY;
                    var tan = offsetY / offsetX;
                    var angle = Math.atan(tan) / (Math.PI / 180);
                    if (offsetX < 0) {
                        angle += 180;
                    }

                    angle -= this.rotation;
                    sonarItem.rotate(angle);

                    var newCx = sonarItem.image.matrix.x(sonarItem.startCx + sonarItem.width / 2 + 20, sonarItem.startCy);
                    var newCy = sonarItem.image.matrix.y(sonarItem.startCx + sonarItem.width / 2 + 20, sonarItem.startCy);
                    this.attr({cx: newCx, cy: newCy});
                }
                return this;
            },
            upHandle = function () {
                sonarItem.updateTransformationString();
                return this;
            };

        sonarItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {
                if (!worldModel.getDrawMode()) {
                    this.handle_cx = sonarItem.rotateHandle.attr("cx");
                    this.handle_cy = sonarItem.rotateHandle.attr("cy");
                    worldModel.setCurrentElement(sonarItem);
                }
                return this;
            }
            ,move = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    sonarItem.transform("T" + dx + "," + dy);

                    sonarItem.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!worldModel.getDrawMode()) {
                    sonarItem.centerX = this.matrix.x(sonarItem.startCx, sonarItem.startCy);
                    sonarItem.centerY = this.matrix.y(sonarItem.startCx, sonarItem.startCy);
                }
                sonarItem.updateTransformationString();
                return this;
            }
        this.image.drag(move, start, up);
        this.hideHandles();
    }

    transform(transformationString: string) {
        super.transform(transformationString);
        this.scanningRegion.transform(this.regionTransformationString + transformationString);
        var newCx = this.image.matrix.x(this.startCx + this.width / 2 + 20, this.startCy);
        var newCy = this.image.matrix.y(this.startCx + this.width / 2 + 20, this.startCy);
        this.rotateHandle.attr({cx: newCx, cy: newCy});
    }

    updateTransformationString(): void {
        super.updateTransformationString();
        this.regionTransformationString = this.scanningRegion.transform();
    }

    rotate(angle: number) {
        this.image.transform(this.transformationString + "R" + angle);


        var regionRotationX = this.image.matrix.x(this.regionStartX, this.regionStartY);
        var regionRotationY = this.image.matrix.y(this.regionStartX, this.regionStartY);

        this.scanningRegion.transform(this.regionTransformationString + "R" + angle + "," +
            regionRotationX + "," + regionRotationY);
    }

    hideHandles(): void {
        this.rotateHandle.hide();
    }

    showHandles(): void {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    }

    remove(): void {
        super.remove();
        this.scanningRegion.remove();
        this.rotateHandle.remove();
    }
}