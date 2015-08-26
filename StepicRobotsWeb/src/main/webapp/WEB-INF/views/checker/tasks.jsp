<%@ include file="../include/include.jsp" %>

<html>
<head>
    <title>Tasks</title>

    <script src="<c:url value='/resources/js/jquery-1.11.0.min.js' />"></script>
    <script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>

    <script type="text/javascript">
        $('body').on('click', 'a.disabled', function(event) {
            event.preventDefault();
        });
        $('body').on('click', 'li.disabled', function(event) {
            event.preventDefault();
        });
    </script>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/tasks.css' />"/>
</head>
<body>
    <div class="container">
        <div class="col-md-9 col-centered">
            <h2><spring:message code="label.tasks"/></h2>
            <br>

            <div style="text-align: left;"><spring:message code="label.language"/>:
                <a href="tasks?locale=ru"><img class="language" src="<c:url value='/resources/css/images/Russia.png' />"/></a>
                <a href="tasks?locale=en"><img class="language" src="<c:url value='/resources/css/images/United-Kingdom.png' />"/></a>
            </div>
            <c:if test="${not empty tasks}">
                <div id="taskList" class="list-group">
                    <c:forEach var="task" items="${tasks}">
                        <div class="list-group-item clearfix">
                            <span class="pull-left">
                                ${task.getTitle()}. ${task.getName()}
                            </span>
                            <span class="pull-right">
                                <c:if test="${task.isOnline()}">
                                    <a class="btn listButton" href="online/${task.getTitle()}?name=${task.getName()}">
                                        <spring:message code="label.online"/></a>
                                </c:if>
                                <a class="btn listButton" href="offline/${task.getTitle()}?name=${task.getName()}">
                                    <spring:message code="label.offline"/></a>
                            </span>
                        </div>
                    </c:forEach>
                </div>
            </c:if>
        </div>
    </div>
</body>
</html>
