class SonarSensorItem extends SensorItem {
    private scanningRegion: RaphaelPath;
    private sonarRange = 255;
    private regionStartX: number;
    private regionStartY: number;
    private regionTransformationString = "";


    constructor(robotItem: RobotItem, worldModel: WorldModel, sensorType: DeviceInfo, pathToImage: string) {
        super(robotItem, worldModel, sensorType, pathToImage);
        var paper : RaphaelPaper = worldModel.getPaper();
        var angleInRad = this.angle * Math.PI / 180;
        this.regionStartX = this.center.x + (this.width) * Math.cos(angleInRad);
        this.regionStartY = this.center.y + (this.width) * Math.sin(angleInRad);

        var regAngle = 20;
        var halfRegAngleInRad = regAngle / 2 * (Math.PI / 180);

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

        this.drawRegion();
    }

    transform(transformationString: string) {
        super.transform(transformationString);
     //   this.scanningRegion.transform(this.regionTransformationString + transformationString);
    }

    updateTransformationString(): void {
        super.updateTransformationString();
     //   this.regionTransformationString = this.scanningRegion.transform();
    }

    rotate(angle: number) {
        super.rotate(angle);

        var regionRotationX = this.image.matrix.x(this.regionStartX, this.regionStartY);
        var regionRotationY = this.image.matrix.y(this.regionStartX, this.regionStartY);

        this.scanningRegion.transform(this.regionTransformationString + "R" + angle + "," +
            regionRotationX + "," + regionRotationY);
    }

    remove(): void {
        super.remove();
        this.scanningRegion.remove();
    }

    private drawRegion() : void {

    }


}