class RobotItemImpl implements RobotItem {
    private robot: RobotModel;
    private image;

    constructor(paper: RaphaelPaper, imageFileName: string, robot: RobotModel) {
        this.robot = robot;
        var robotPosition: TwoDPosition = robot.getPosition();
        this.image = paper.image(imageFileName, robotPosition.x, robotPosition.y, 50, 50);

        this.image.rotate(45);

        var start = function () {
                this.ox = this.attr("x");
                this.oy = this.attr("y");

                var realX = this.matrix.x(this.attr("x"),this.attr("y"));
                console.log("x = " + realX);

                var realY = this.matrix.y(this.attr("x"),this.attr("y"));
                console.log("y = " + realY);
                this._transform = this.transform();
            }
            ,move = function (dx, dy) {
                this.transform("t" + dx + "," + dy + this._transform);
            }
            ,up = function () {

            }
        this.image.drag(move, start, up);
    }

    ride(): void {
        console.log("robot ride");
    }
}