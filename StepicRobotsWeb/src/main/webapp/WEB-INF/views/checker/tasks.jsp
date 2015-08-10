<%@ include file="../include/include.jsp" %>

<html>
<head>
    <title>Tasks</title>

    <script src="<c:url value='/resources/js/jquery-1.11.0.min.js' />"></script>
    <script src="<c:url value='/resources/js/joint.js' />"></script>
    <script src="<c:url value='/app/out.js' />"></script>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/checker.css' />"/>
</head>
<body>
    <div class="container">
        <div class="col-md-9 col-centered">
            <h2>Tasks</h2>
            <br>

            <c:if test="${not empty tasks}">
                <div id="taskList" class="list-group">
                    <c:forEach var="task" items="${tasks}">
                        <a href="task/${task.getName()}" class="list-group-item">${task.getTitle()}. ${task.getName()}</a>
                    </c:forEach>
                </div>
            </c:if>
        </div>
    </div>
</body>
</html>
