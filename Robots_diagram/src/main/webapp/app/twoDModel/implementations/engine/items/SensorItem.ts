class SensorItem {
    protected image: RaphaelElement;
    protected width: number = 30;
    protected height: number = 30;
    protected transformationString = "";

    constructor(worldModel: WorldModel, position: TwoDPosition) {

    }

    remove(): void {
        this.image.remove();
    }

    transform(transformationString): void {
        this.image.transform(this.transformationString + transformationString);
    }

    updateTransformationString(): void {
        this.transformationString = this.image.transform();
    }
}