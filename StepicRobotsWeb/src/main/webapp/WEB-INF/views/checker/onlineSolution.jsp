<%@ include file="../include/include.jsp" %>

<html>
<head>
    <title>${name}</title>

    <jsp:include page="../include/scripts.jsp" flush="true"/>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/joint.css' />"/>

    <link rel="stylesheet" href="<c:url value='/resources/treeview/jquery.treeview.css' />"/>
    <script type="text/javascript" src="<c:url value='/resources/treeview/jquery.treeview.js' />"></script>

    <link rel="stylesheet" href="<c:url value='/resources/css/jquery-ui.css' />"/>


    <link rel="stylesheet" href="<c:url value='/resources/css/onlineSolution.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/twoDModel.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/tooltip.css' />"/>
</head>
<body>
<div ng-app ng-controller="RootDiagramController">
    <div class="container">
        <div id="titleContent" class="col-md-12">
            <h2><spring:message code="label.task"/>: ${title}. <spring:message code="task.${name}"/></h2>
            <br>

            <h4><spring:message code="label.description"/>: ${description}
                <span class="myTooltip" data-tooltip="Left motor - M3 &#xa; Right motor - M4">
                    <img class="questionSign" src="<c:url value='/resources/css/images/question.png' />"/>
                </span>
            </h4>

            <br>
        </div>
        <div class="col-md-9">
            <div id="diagramContent" class="row unselectable" ng-controller="DiagramController" task="${name}">
                <ul class='custom-menu'>
                    <li data-action="delete">Delete</li>
                </ul>
                <div id="diagram_paper">
                    <div id="diagramSpinner" class="centerSpinner">
                    </div>
                </div>
                <button id="submit_button" class="btn btn-success btn-lg" type="button" ng-click="submit()">
                    <spring:message code="label.submit"/>
                </button>
            </div>
            <%@ include file="twoDModelContent.jsp" %>
        </div>
        <div id="paletteContent" class="row unselectable">
            <div class="col-md-3">
                <div id="palette">
                    <div id="properties">
                        <legend style="padding: 10px"><spring:message code="label.propertyEditor"/></legend>
                        <table class="table table-condensed" id="property_table">
                            <thead>
                            <tr>
                                <th><spring:message code="label.property"/></th>
                                <th><spring:message code="label.value"/></th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div id="elements">
                        <legend style="margin-bottom: 5px"><spring:message code="label.palette"/></legend>
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
