class SonarSensorItem extends SensorItem {
    private scanningRegion: RaphaelPath;
    private sonarRange = 255;
    private regionStartX: number;
    private regionStartY: number;
    private regionTransformationString = "";
    protected regionTranslation: string;
    protected regionRotation: string;

    constructor(robotItem:RobotItem, worldModel:WorldModel, sensorType:DeviceInfo,
                pathToImage:string, position?:TwoDPosition) {
        super(robotItem, worldModel, sensorType, pathToImage, position);
        var paper:RaphaelPaper = worldModel.getPaper();
        var defaultPosition = this.getStartPosition(position);

        this.regionStartX = defaultPosition.x + this.width / 2;
        this.regionStartY = defaultPosition.y + this.height / 2

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

        this.regionTranslation = "t0,0";
        this.regionRotation = "R0";
    }

    setStartPosition() {
        super.setStartPosition();
        this.regionTranslation = "t0,0";
        this.regionRotation = "r0";
        var regAngle = 20;
        var halfRegAngleInRad = regAngle / 2 * (Math.PI / 180)

        var rangeInPixels = this.sonarRange * Constants.pixelsInCm;

        var regionTopX = this.regionStartX + Math.cos(halfRegAngleInRad) * rangeInPixels;
        var regionTopY = this.regionStartY - Math.sin(halfRegAngleInRad) * rangeInPixels;

        var regionBottomX = regionTopX;
        var regionBottomY = this.regionStartY + Math.sin(halfRegAngleInRad) * rangeInPixels;

        this.scanningRegion.attr({
            path: "M" + this.regionStartX + "," + this.regionStartY +
            "L" + regionTopX + "," + regionTopY +
            "Q" + (this.regionStartX + rangeInPixels) + "," + this.regionStartY + " " + regionBottomX + "," + regionBottomY +
            "Z"
        });

        this.scanningRegion.transform("");
        this.regionTransformationString = "";
    }

    transform(transformationString: string) {
        super.transform(transformationString);
        this.scanningRegion.transform(this.regionTransformationString + transformationString);
    }

    animate(positionX: number, positionY: number): void {
        super.animate(positionX, positionY);

        var newX = positionX + this.offsetPosition.x + this.width / 2;
        var newY = positionY + this.offsetPosition.y + this.height / 2;
        var positionOffsetX = newX - this.regionStartX;
        var positionOffsetY = newY - this.regionStartY;

        this.regionTranslation = "t" + positionOffsetX + "," + positionOffsetY;
        this.scanningRegion.transform(this.getRegionTransformation());
    }

    updateTransformationString(): void {
        super.updateTransformationString();
        this.regionTransformationString = this.scanningRegion.transform();
    }

    rotate(angle: number): void {
        super.rotate(angle);
        this.regionRotation = "r" + angle + "," + this.regionStartX + "," + this.regionStartY;
        this.scanningRegion.transform(this.getRegionTransformation());
    }

    rotateByRobot(angle: number, centerX: number, centerY: number) {
        super.rotateByRobot(angle, centerX, centerY);
        this.scanningRegion.transform(this.getRegionTransformation());
    }

    remove():void {
        super.remove();
        this.scanningRegion.remove();
    }

    private getRegionTransformation(): string {
        return this.currentRobotRotation + this.regionTranslation + this.regionRotation;
    }
}