<%@ include file="include/include.jsp" %>

<html>
<head>
    <title>Stepic Robots</title>

    <jsp:include page="include/scripts.jsp" flush="true"/>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/joint.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/index.css' />"/>

    <link rel="stylesheet" href="<c:url value='/resources/treeview/jquery.treeview.css' />"/>
    <script type="text/javascript" src="<c:url value='/resources/treeview/jquery.treeview.js' />"></script>
</head>
<body>
<div ng-app ng-controller="RootDiagramController">
    <div class="container">
        <div class="col-md-9">
            <div id="diagramContent" class="row unselectable" ng-controller="DiagramController" task="${taskId}">
                <div id="diagram_paper">
                    <div id="diagramSpinner" class="centerSpinner">
                    </div>
                </div>
                <button id="submit_button" class="btn btn-success btn-lg" type="button" ng-click="submit()">Submit
                </button>
            </div>
            <div  id="twoDModelContent" class="row unselectable">
                <div id="twoDModel_stage" ng-controller="TwoDModelEngineFacadeImpl" task="${taskId}">
                    <div id="twoDModelSpinner" class="centerSpinner">
                    </div>
                </div>
                <button id="stop_button" class="btn btn-danger btn-lg" type="button" ng-click="vm.stopPlay()">Stop
                </button>
            </div>
        </div>
        <div id="paletteContent" class="row unselectable">
            <div class="col-md-3">
                <div id="palette">
                    <div id="properties">
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
                    <div id="elements">
                        <legend style="margin-bottom: 5px">Palette</legend>
                        <p>
                            <span id="remove" class="glyphicon glyphicon-trash"
                                  ng-click="vm.removeCurrentElement()"></span>
                            Delete node
                        </p>

                        <div id="elements_tree">
                            <ul id="navigation">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
