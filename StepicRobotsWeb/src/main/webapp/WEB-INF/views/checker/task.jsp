<%@ include file="../include/include.jsp" %>

<html>
<head>
    <title>Check solution</title>

    <jsp:include page="../include/scripts.jsp" flush="true"/>
    <script src="<c:url value='/resources/js/jquery.form.min.js' />"></script>
    <script src="<c:url value='/resources/js/bootstrap-filestyle.min.js' />"></script>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/checker.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/checker.css' />"/>

</head>
<body>
    <div class="container" ng-app ng-controller="RootDiagramController">
        <div class="col-md-9 col-centered">
            <div id="taskContent" ng-controller="CheckerController" task="${taskId}">
                <h2>Task: ${taskId}</h2>
                <br>

                <a href="downloadTask/${taskId}"><h4>Download task</h4></a>
                <br>

                <h4>Check your solution</h4>

                <form id="uploadForm" method="POST" action="upload/${taskId}" enctype="multipart/form-data">
                    <input type="file" name="fileName" id="fileName" class="filestyle" data-buttonText="Browse" data-buttonName="btn-primary"/>
                </form>
                <br>

                <button id="upload" class="btn btn-success" ng-click="uploadFile()">Upload</button>
                <br>
                <br>

                <div id="spinner" class="spinner">
                </div>

                <div id="result"></div>
                <br>

                <button id="showResult" class="btn btn-primary" ng-click="showResult()">Show result</button>
                <br>
                <br>
            </div>
            <div id="twoDModelContent" class="row unselectable">
                <div id="twoDModel_stage" ng-controller="TwoDModelEngineFacadeImpl" task="${taskId}">

                    <div id="twoDModelSpinner" class="centerSpinner">
                    </div>
                </div>
                <div id="infoAlert" class="alert fade in">
                    <a href="#" class="close" aria-label="close">&times;</a>
                </div>
                <button id="stop_button" class="btn btn-danger btn-lg" type="button" ng-click="vm.stopPlay()">Stop
                </button>
            </div>
        </div>
    </div>
</body>
</html>
