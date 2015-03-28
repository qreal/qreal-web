class RootDiagramController {
    private robotModel: TwoDRobotModelImpl;

    constructor($scope) {
        $scope.root = this;
    }

    setRobotModel(robotModel: TwoDRobotModelImpl) {
        this.robotModel = robotModel;
    }

    getRobotModel(): TwoDRobotModelImpl {
        return this.robotModel;
    }
}