class DrawingItemImpl implements DrawingItem {

    private currentPosition : TwoDPosition;
    private worldModel : WorldModel;
    private drawingState : boolean;

    constructor(worldModel : WorldModel, robotItem : RobotItemImpl) {
        var robotPosition : TwoDPosition = robotItem.getCenterPosition();
        this.currentPosition = new TwoDPosition(robotPosition.x - robotItem.getWidth() / 2, robotPosition.y);
        this.worldModel = worldModel;
        this.drawingState = false;
    }

    setDrawingState(newState : boolean) : void {
        this.drawingState = newState;
    }

    setPosition(x : number, y : number) : void {
        this.currentPosition.x = x;
        this.currentPosition.y = y;
    }

    drawLine() : void {
        var paper = this.worldModel.getPaper();;
        if (!this.drawingState) {
            var rect = paper.rect(this.currentPosition.x, this.currentPosition.y, 3, 3);
            rect.attr({stroke : "#bb0000", fill : "bb0000"});
        }
    }
}