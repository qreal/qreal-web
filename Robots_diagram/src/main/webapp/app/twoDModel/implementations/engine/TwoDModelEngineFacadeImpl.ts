class TwoDModelEngineFacadeImpl implements TwoDModelEngineFacade {
    private robotModelName: string;
    private model: Model;

    constructor($scope) {
        $scope.vm = this;
        var facade = this;
        var robotModel = $scope.root.getRobotModel();
        this.robotModelName = robotModel.getName();

        this.model = new ModelImpl();

        $('#confirmDelete').find('.modal-footer #confirm').on('click', function(){
            facade.model.getWorldModel().clearPaper();
            $('#confirmDelete').modal('hide');
        });
    }

    setDrawLineMode(): void {
        this.model.getWorldModel().setDrawLineMode();
    }

    setDrawWallMode(): void {
        this.model.getWorldModel().setDrawWallMode();
    }

    setDrawPencilMode(): void {
        this.model.getWorldModel().setDrawPencilMode();
    }

    setDrawEllipseMode(): void {
        this.model.getWorldModel().setDrawEllipseMode();
    }

    setNoneMode(): void {
        this.model.getWorldModel().setNoneMode();
    }

    openDiagram(): void {
        $("#twoDModelContent").hide();
        $("#diagramContent").show();
    }
}