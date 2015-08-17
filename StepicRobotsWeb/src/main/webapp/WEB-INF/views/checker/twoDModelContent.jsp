<div id="twoDModelContent" class="row unselectable">
    <div id="twoDModel_stage" ng-controller="TwoDModelEngineFacadeImpl" task="${taskId}">

        <div id="twoDModelSpinner" class="centerSpinner">
        </div>
    </div>
    <div id="infoAlert" class="alert fade in">
        <a href="" class="close" aria-label="close">&times;</a>
    </div>

    <button id="menu_button" type="button" class="btn btn-default">
        <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
    </button>

    <button id="stop_button" class="btn btn-danger btn-lg" type="button" ng-click="vm.stopPlay()">Stop
    </button>
</div>
