var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SonarSensorItem = (function (_super) {
    __extends(SonarSensorItem, _super);
    function SonarSensorItem(robotItem, worldModel, sensorType, pathToImage) {
        _super.call(this, robotItem, worldModel, sensorType, pathToImage);
        this.sonarRange = 255;
        this.regionTransformationString = "";
        var paper = worldModel.getPaper();
        var defaultPosition = this.getDefaultPosition();
        this.regionStartX = defaultPosition.x + this.width / 2;
        this.regionStartY = defaultPosition.y + this.height / 2;
        var regAngle = 20;
        var halfRegAngleInRad = regAngle / 2 * (Math.PI / 180);
        var rangeInPixels = this.sonarRange * Constants.pixelsInCm;
        var regionTopX = this.regionStartX + Math.cos(halfRegAngleInRad) * rangeInPixels;
        var regionTopY = this.regionStartY - Math.sin(halfRegAngleInRad) * rangeInPixels;
        var regionBottomX = regionTopX;
        var regionBottomY = this.regionStartY + Math.sin(halfRegAngleInRad) * rangeInPixels;
        this.scanningRegion = paper.path("M" + this.regionStartX + "," + this.regionStartY + "L" + regionTopX + "," + regionTopY + "Q" + (this.regionStartX + rangeInPixels) + "," + this.regionStartY + " " + regionBottomX + "," + regionBottomY + "Z");
        this.scanningRegion.attr({ fill: "#c5d0de", stroke: "#b1bbc7", opacity: 0.5 });
    }
    SonarSensorItem.prototype.transform = function (transformationString) {
        super.transform.call(this, transformationString);
        this.scanningRegion.transform(this.regionTransformationString + transformationString);
    };
    SonarSensorItem.prototype.updateTransformationString = function () {
        super.updateTransformationString.call(this);
        this.regionTransformationString = this.scanningRegion.transform();
    };
    SonarSensorItem.prototype.rotate = function (angle) {
        super.rotate.call(this, angle);
        var regionRotationX = this.image.matrix.x(this.regionStartX, this.regionStartY);
        var regionRotationY = this.image.matrix.y(this.regionStartX, this.regionStartY);
        this.scanningRegion.transform(this.regionTransformationString + "R" + angle + "," + regionRotationX + "," + regionRotationY);
    };
    SonarSensorItem.prototype.remove = function () {
        super.remove.call(this);
        this.scanningRegion.remove();
    };
    return SonarSensorItem;
})(SensorItem);
//# sourceMappingURL=SonarSensorItem.js.map