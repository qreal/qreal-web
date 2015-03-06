<div class="navbar navbar-inverse" role="navigation">
    <div class="container-fluid">
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">File<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="" role="menuitem" tabindex="-1" ng-click="vm.saveDiagram()">Save</a></li>
                        <li><a href="" role="menuitem" tabindex="-1" ng-click="vm.openDiagram()">Open</a></li>
                    </ul>
                </li>
                <li>
                    <p class="navbar-text" ng-click="vm.removeCurrentElement()">
                        <span id="remove" class="glyphicon glyphicon-trash" style="vertical-align: middle"></span>
                    </p>
                </li>
                <li>
                    <a href="2dmodel">
                        <img src="images/2dmodel/2d-model.svg" style="width: 25px; height:25px;" />
                    </a>
                </li>
            </ul>

        </div>
    </div>
</div>