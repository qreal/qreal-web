<%@ include file="include.jsp" %>

<head>
    <title>Robots Diagram</title>

    <jsp:include page="scripts.jsp"/>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>

</head>

<body>

<%@ include file="navbar.jsp" %>


<!-- Main -->
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3">
            <!-- Left column -->

            <ul class="nav nav-pills nav-stacked">
                <li class="nav-header"></li>
                <li class="active"><a href="#home" data-toggle="tab"><i class="glyphicon glyphicon-list"></i> Robots</a>
                </li>
                <li><a href="#profile" data-toggle="tab"><i class="glyphicon glyphicon-briefcase"></i> Diagrams</a></li>
            </ul>

        </div>
        <!-- /col-3 -->
        <div class="col-sm-9">

            <div id="myTabContent" class="tab-content">
                <div class="tab-pane active in" id="home">
                    <form id="tab">
                        <label>Username</label>
                        <input type="text" value="jsmith" class="input-xlarge">
                        <label>First Name</label>
                        <input type="text" value="John" class="input-xlarge">
                        <label>Last Name</label>
                        <input type="text" value="Smith" class="input-xlarge">
                        <label>Email</label>
                        <input type="text" value="jsmith@yourcompany.com" class="input-xlarge">
                        <label>Address</label>

                        <div>
                            <button class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
                <div class="tab-pane fade" id="profile">
                    <form id="tab2">
                        <label>New Password</label>
                        <input type="password" class="input-xlarge">

                        <div>
                            <button class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--/col-span-9-->
    </div>
</div>
<!-- /Main -->


</body>
</html>
