<div id="twoDModelContent" class="row unselectable" ng-controller="TwoDModelEngineFacadeImpl">
    <div id="twoDModel_stage" task="${taskId}">

        <div id="twoDModelSpinner" class="centerSpinner">
        </div>
    </div>
    <div id="infoAlert" class="alert fade in">
        <a href="" class="close" aria-label="close">&times;</a>
    </div>

    <button id="menu_button" type="button" class="btn btn-default" ng-click="vm.showDisplay()">
        <span class="glyphicon glyphicon-modal-window" aria-hidden="true"></span>
    </button>

    <img id="display" src="/StepicRobotsWeb/images/2dmodel/trikKit/controller.png"/>
    <span id="close_display" class="glyphicon glyphicon-remove-circle" aria-hidden="true" ng-click="vm.closeDisplay()"></span>

    <button id="stop_button" class="btn btn-danger btn-lg" type="button" ng-click="vm.stopPlay()">Stop
    </button>
</div>
