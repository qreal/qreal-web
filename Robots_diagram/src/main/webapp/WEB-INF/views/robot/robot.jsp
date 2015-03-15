<%@ include file="../include/include.jsp" %>

<html lang="en">
<head>
    <title>Robots Diagram</title>

    <jsp:include page="../include/scripts.jsp"/>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>

</head>

<body>

<%@ include file="../include/navbar.jsp" %>


<!-- Main -->
<div class="container-fluid">

    <!-- upper section -->
    <div class="row">
        <div class="col-sm-3">
            <!-- left -->
            <h3><i class="glyphicon glyphicon-briefcase"></i> Toolbox</h3>
            <hr>

            <ul class="nav nav-stacked">
                <li><a href="javascript:;"><i class="glyphicon glyphicon-flash"></i> My robots</a></li>
                <li><a href="javascript:;"><i class="glyphicon glyphicon-link"></i> My Diagrams</a></li>
                <li><a href="javascript:;"><i class="glyphicon glyphicon-list-alt"></i> Map</a></li>
                <li><a href="javascript:;"><i class="glyphicon glyphicon-book"></i> Settings</a></li>
            </ul>

            <hr>

        </div>
        <!-- /span-3 -->
        <div class="col-sm-9">

            <!-- column 2 -->
            <h3><i class="glyphicon glyphicon-dashboard"></i> Dashboard</h3>

            <hr>

            <div class="row">
                <!-- center left-->
                <div class="col-md-6">
                    <div class="container-fluid well">
                        <div class="row-fluid">
                            <div class="col-md-8">
                                <div class="col-md-6">
                                    <img src="https://yt3.ggpht.com/-NPXfeRGzE34/AAAAAAAAAAI/AAAAAAAAAAA/xsp9Nimte-M/s100-c-k-no/photo.jpg"
                                         class="img-circle">
                                </div>

                                <div class="col-md-6">
                                    <h3>Robot name</h3>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="btn-group pull-right">
                                    <a class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                                        <li class="glyphicon glyphicon-cog"></li>
                                        Action
                                        <span class="caret"></span>

                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#"><span class="icon-wrench"></span> Modify</a></li>
                                        <li><a href="#"><span class="icon-trash"></span> Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!--/col-span-6-->

                <div class="col-md-6">
                    <div class="container-fluid well">
                        <div class="row-fluid">
                            <div class="col-md-4">
                                <img src="http://pict.ru/images/avatars/dancing-robot-pre100.gif"
                                     class="img-circle">
                            </div>

                            <div class="col-md-4">
                                <h3>Robot name</h3>
                            </div>

                            <div class="col-md-4">
                                <div class="btn-group pull-right">
                                    <a class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                                        <li class="glyphicon glyphicon-cog"></li>
                                        Action
                                        <span class="caret"></span>

                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#"><span class="icon-wrench"></span> Modify</a></li>
                                        <li><a href="#"><span class="icon-trash"></span> Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!--/col-span-6-->

            </div>
            <!--/row-->
        </div>
        <!--/col-span-9-->

    </div>
    <!--/row-->
    <!-- /upper section -->

    <!-- lower section -->


</div>
<!--/container-->
<!-- /Main -->

</body>

</html>
