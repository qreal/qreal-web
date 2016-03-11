var RootDiagramController = (function () {
    function RootDiagramController($scope, $compile) {
        $scope.root = this;
        $scope.$on("emitDisplayResult", function (event, result) {
            $scope.$broadcast("displayResult", result);
        });
        $scope.$on("emitCheckingResult", function (event, result) {
            $scope.$broadcast("displayCheckingResult", result);
        });
        $scope.$on("emit2dModelLoad", function (event, fieldXML) {
            $scope.$broadcast("2dModelLoad", fieldXML);
        });
        $scope.$on("timeline", function (event, timeline) {
            $scope.$broadcast("interpret", timeline);
        });
    }
    return RootDiagramController;
})();
//# sourceMappingURL=root.js.map