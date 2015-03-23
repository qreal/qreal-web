class RootDiagramController {
    private robotModel: TwoDRobotModel;

    constructor($scope) {
        $scope.root = this;
    }

    setRobotModel(robotModel: TwoDRobotModel) {
        this.robotModel = robotModel;
    }

    getRobotModel(): TwoDRobotModel {
        return this.robotModel;
    }
}