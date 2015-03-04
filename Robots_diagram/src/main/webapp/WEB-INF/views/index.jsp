<%@ include file="include.jsp" %>
<html>
<head>
    <title>Robots Diagram</title>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />" />
    <link rel="stylesheet" href="<c:url value='/resources/css/joint.css' />" />
    <link rel="stylesheet" href="<c:url value='/resources/css/base.css' />" />

    <script src="<c:url value='/resources/js/jquery-1.11.0.min.js' />"></script>
    <script src="<c:url value='/resources/js/angular.js' />"></script>
    <script src="<c:url value='/resources/js/joint.js' />"></script>
    <script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>
    <script src="<c:url value='/resources/js/jquery-ui.min.js' />"></script>

    <link rel="stylesheet" href="<c:url value='/resources/treeview/jquery.treeview.css' />" />
    <script type="text/javascript" src="<c:url value='/resources/treeview/jquery.treeview.js' />"></script>

    <script src="<c:url value='/app/out.js' />"></script>
</head>

<body ng-app="diagram" ng-controller="DiagramController">
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

    <div id="container" >
        <div id="left-menu">
            <legend style="padding: 10px">Property Editor</legend>
            <table class="table table-condensed" id="property_table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <div id="paper">
        </div>

        <div id="right-menu">
            <legend style="padding: 10px">Palette</legend>
            <div id="elements_tree">
                <ul id="navigation">
                </ul>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $(document).ready(function(){
            $("#navigation").treeview({
                persist: "location"
            });
        });
    </script>
</body>
</html>
