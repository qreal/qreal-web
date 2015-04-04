class RobotItemImpl implements RobotItem {
    private robot: RobotModel;
    private image;
    private rotateHandle: RaphaelElement;
    private centerX: number;
    private centerY: number;
    private width: number = 50;
    private height: number = 50;

    constructor(worldModel: WorldModel, position: TwoDPosition, imageFileName: string, robot: RobotModel) {
        this.robot = robot;
        var paper = worldModel.getPaper();
        this.image = paper.image(imageFileName, position.x, position.y, this.width, this.height);

        this.centerX = position.x + this.width / 2;
        this.centerY = position.y + this.height / 2;

        var startCx = this.centerX;
        var startCy = this.centerY;

        var handleRadius: number = 10;

        var handleAttrs = {
            fill: "transparent",
            cursor: "pointer",
            "stroke-width": 1,
            stroke: "black"
        };

        this.rotateHandle = paper.circle(position.x + this.width + 20,
            position.y + this.height / 2, handleRadius).attr(handleAttrs);

        var robotItem = this;

        var sonar: SonarSensorItem = new SonarSensorItem(worldModel,
            {x: position.x + this.width + 10, y: position.y - 15 + this.height / 2});

        var startHandle = function () {
                if (!worldModel.getDrawMode()) {
                    this.transformation = robotItem.image.transform();
                    this.rotation = robotItem.image.matrix.split().rotate;
                    this.cx = this.attr("cx");
                    this.cy = this.attr("cy");

                    this.sonarTransformation = sonar.getSonarTransformation();
                    this.sonarRegionTransformation = sonar.getRegionTransformation();
                }
                return this;
            },
            moveHandle = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
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
                    robotItem.image.transform(this.transformation + "R" + angle + "," +
                        robotItem.centerX + "," + robotItem.centerY);

                    sonar.setSonarTransformation(this.sonarTransformation + "R" + angle + "," +
                        robotItem.centerX + "," + robotItem.centerY);
                    sonar.setRegionTransformation(this.sonarRegionTransformation + "R" + angle + "," +
                        robotItem.centerX + "," + robotItem.centerY);


                    var newCx = robotItem.image.matrix.x(startCx + robotItem.width / 2 + 20, startCy);
                    var newCy = robotItem.image.matrix.y(startCx + robotItem.width / 2 + 20, startCy);
                    this.attr({cx: newCx, cy: newCy});
                }
                return this;
            },
            upHandle = function () {
                return this;
            };

        robotItem.rotateHandle.drag(moveHandle, startHandle, upHandle);

        var start = function () {
                if (!worldModel.getDrawMode()) {
                    this.transformation = this.transform();

                    this.sonarTransformation = sonar.getSonarTransformation();
                    this.sonarRegionTransformation = sonar.getRegionTransformation();

                    this.handle_cx = robotItem.rotateHandle.attr("cx");
                    this.handle_cy = robotItem.rotateHandle.attr("cy");
                    worldModel.setCurrentElement(robotItem);
                }
                return this;
            }
            ,move = function (dx, dy) {
                if (!worldModel.getDrawMode()) {
                    this.transform(this.transformation + "T" + dx + "," + dy);

                    sonar.setSonarTransformation(this.sonarTransformation + "T" + dx + "," + dy);
                    sonar.setRegionTransformation(this.sonarRegionTransformation + "T" + dx + "," + dy);

                    robotItem.rotateHandle.attr({"cx": this.handle_cx + dx, "cy": this.handle_cy + dy});
                }
                return this;
            }
            ,up = function () {
                if (!worldModel.getDrawMode()) {
                    robotItem.centerX = this.matrix.x(startCx, startCy);
                    robotItem.centerY = this.matrix.y(startCx, startCy);
                }
                return this;
            }
        this.image.drag(move, start, up);
        this.hideHandles();
    }

    ride(): void {
        console.log("robot ride");
    }

    hideHandles(): void {
        this.rotateHandle.hide();
    }

    showHandles(): void {
        this.rotateHandle.toFront();
        this.rotateHandle.show();
    }
}