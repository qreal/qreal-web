class RobotItemImpl implements RobotItem {
    private robot: RobotModel;
    private image;
    private rotateHandle: RaphaelElement;
    private centerX: number;
    private centerY: number;
    private width: number = 50;
    private height: number = 50;

    constructor(paper: RaphaelPaper, imageFileName: string, robot: RobotModel) {
        this.robot = robot;
        var robotPosition: TwoDPosition = robot.getPosition();
        this.image = paper.image(imageFileName, robotPosition.x, robotPosition.y, this.width, this.height);

        this.centerX = robotPosition.x + this.width / 2;
        this.centerY = robotPosition.y + this.height / 2;

        var startCx = this.centerX;
        var startCy = this.centerY;

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotateHandle = paper.circle(robotPosition.x + this.width + 20,
            robotPosition.y + this.height / 2, handleRadius).attr(handleAttrs);

        var robotItem = this;

        var startHandle = function () {
                this.transformation = robotItem.image.transform();
                this.rotation = robotItem.image.matrix.split().rotate;
                this.cx = this.attr("cx");
                this.cy = this.attr("cy");
                return this;
            },
            moveHandle = function (dx, dy) {
                var newX = this.cx + dx;
                var newY = this.cy + dy;
                var offsetX = newX - robotItem.centerX;
                var offsetY = newY - robotItem.centerY;
                var tan = offsetY / offsetX;
                var angle = Math.atan(tan) / (Math.PI / 180);
                if (offsetX < 0) {
                    angle += 180;
                }
                angle -= this.rotation;
                robotItem.image.transform(this.transformation + "R" + angle);
                var newCx = robotItem.image.matrix.x(startCx + robotItem.width / 2 + 20, startCy);
                var newCy = robotItem.image.matrix.y(startCx + robotItem.width / 2 + 20, startCy);
                this.attr({cx: newCx, cy: newCy});
                return this;
            },
            upHandle = function () {
                return this;
            };

        robotItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {
                this.transformation = this.transform();
                this.handle_cx = robotItem.rotateHandle.attr("cx");
                this.handle_cy = robotItem.rotateHandle.attr("cy");
            }
            ,move = function (dx, dy) {
                this.transform(this.transformation + "T" + dx + "," + dy);
                robotItem.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
            }
            ,up = function () {
                robotItem.centerX = this.matrix.x(startCx, startCy);
                robotItem.centerY = this.matrix.y(startCx, startCy);
            }
        this.image.drag(move, start, up);
    }
    ride(): void {
        console.log("robot ride");
    }
}