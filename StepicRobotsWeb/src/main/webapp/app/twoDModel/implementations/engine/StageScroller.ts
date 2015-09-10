class StageScroller {

    private ZOOM: number = 2/3;
    private stage;

    constructor() {
        this.stage = $("#twoDModel_stage");
    }

    public scrollToPoint(x: number, y: number) {
        var width: number = this.stage.width();
        var height: number = this.stage.height();

        var offsetX = x * this.ZOOM - width / 2;
        var offsetY = y * this.ZOOM - height / 2;

        this.stage.scrollLeft(offsetX);
        this.stage.scrollTop(offsetY);
    }

}