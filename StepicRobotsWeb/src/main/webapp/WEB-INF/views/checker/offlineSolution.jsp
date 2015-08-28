<%@ include file="../include/include.jsp" %>

<html>
<head>
    <title>${name}</title>

    <jsp:include page="../include/scripts.jsp" flush="true"/>
    <script src="<c:url value='/resources/js/jquery.form.min.js' />"></script>
    <script src="<c:url value='/resources/js/bootstrap-filestyle.min.js' />"></script>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>

    <link rel="stylesheet" href="<c:url value='/resources/css/offlineSolution.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/twoDModel.css' />"/>
</head>
<body>
    <div class="container" ng-app ng-controller="RootDiagramController">
        <div class="col-md-9 col-centered">
            <div id="taskContent" ng-controller="CheckerController" task="${name}">
                <h2><spring:message code="label.task"/>: ${title}. <spring:message code="task.${name}"/></h2>
                <br>

                <h4><spring:message code="label.description"/>: ${description}</h4>

                <a href="downloadTask/${title}?name=${name}"><h4><spring:message code="label.download"/></h4></a>
                <br>

                <h4><spring:message code="label.checkSolution"/></h4>

                <form id="uploadForm" method="POST" action="upload/${name}" enctype="multipart/form-data">
                    <input type="file" name="fileName" id="fileName" class="filestyle" data-buttonText="<spring:message code="label.browse"/>" data-buttonName="btn-primary"/>
                </form>
                <br>

                <button id="upload" class="btn btn-success" ng-click="uploadFile()"><spring:message code="label.upload"/></button>
                <br>
                <br>

                <div id="spinner" class="spinner">
                </div>

                <div id="result"></div>
                <br>

                <button id="showResult" class="btn btn-primary" ng-click="showResult()"><spring:message code="label.showResult"/></button>
                <br>
                <br>
            </div>
            <%@ include file="twoDModelContent.jsp" %>
        </div>
    </div>
</body>
</html>
