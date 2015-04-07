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
<body ng-app ng-controller="RootDiagramController">
    <div class="container">
        <div class="row">
            <div class="col-md-8 no-float">
                <div id="diagram_container" class="container"  ng-controller="DiagramController">
                    <div class="row">
                        <div class="col-md-9 no-float">
                            <div class="background_div">
                                <div id="diagram_paper">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 no-float">
                            <div class="background_div">
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
                                            <span id="remove" class="glyphicon glyphicon-trash" ng-click="vm.removeCurrentElement()"></span>
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
            </div>
            <div class="col-md-4 no-float">
                <div class="background_div">
                    <div id="twoDModel_stage"  ng-controller="TwoDModelEngineFacadeImpl">

                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
