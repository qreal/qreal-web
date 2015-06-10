class RootDiagramController {
    private realModel: CommonRobotModel;
    private robotModel: TwoDRobotModel;

    constructor($scope, $compile) {
        $scope.root = this;

        this.realModel = new TrikRobotModelBase();
        this.robotModel = new TwoDRobotModel(this.realModel, "model");

        $scope.$on("emitDisplayTrace", function(event, traceJson) {
            $scope.$broadcast("DisplayTrace", traceJson);
        });

        $scope.$on("emit2dModelLoad", function(event) {
            $scope.$broadcast("2dModelLoad");
        });
    }

    setRobotModel(robotModel: TwoDRobotModel) {
        this.robotModel = robotModel;
    }

    getRobotModel(): TwoDRobotModel {
        return this.robotModel;
    }
}