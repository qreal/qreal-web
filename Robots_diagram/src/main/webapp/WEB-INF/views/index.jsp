<%@ include file="include/include.jsp" %>

<html lang="en">
<head>
    <title>Robots Diagram</title>

    <script src="<c:url value='/resources/js/jquery-1.11.0.min.js' />"></script>
    <jsp:include page="include/scripts.jsp"/>
    <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/map.js' />"></script>
    <script src="<c:url value='/resources/js/robot.js' />"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#target").click(function () {
                var robots = JSON.parse('${robots}');
                robots.forEach(function (robot) {
                    addLabel(robot);
                });
            });

            $("#registerRobot").click(function () {
                var name = $('#robotName').val();
                var code = $('#secretCode').val();
                var data = "robotName=" + name + "&secretCode=" + code;
                $.ajax({
                    type: 'POST',
                    url: 'registerRobot',
                    data: data,
                    success: function (data) {
                        location.reload();
                    },
                    error: function (response, status, error) {
                        console.log("error");
                    }
                });
            });

            $('[name="deleteRobot"]').click(function (event) {
                var robotName = event.target.id.substring(7);
                var data = "robotName=" + robotName;
                $.ajax({
                    type: 'POST',
                    url: 'deleteRobot',
                    data: data,
                    success: function (data) {
                        location.reload();
                    },
                    error: function (response, status, error) {
                        console.log("error");
                    }
                });
            });

            $('[name="sendDiagram"]').click(function (event) {
                var robotName = event.target.id.substring(13);
                var data = "robotName=" + robotName + "&program=" + "MUR MUR MUR";
                $.ajax({
                    type: 'POST',
                    url: 'sendDiagram',
                    data: data,
                    success: function (data) {
                        $('#sendDiagramModal').modal('hide')
                        alert("Successfully sent ");
                    },
                    error: function (response, status, error) {
                        console.log("error");
                    }
                });
            });
        });
    </script>
    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>

</head>

<body>

<%@ include file="include/navbar.jsp" %>


<!-- Main -->
<div class="container-fluid">


    <!-- upper section -->
    <div class="row">
        <div class="col-sm-3">
            <!-- left -->
            <h3><i class="glyphicon glyphicon-briefcase"></i> Toolbox</h3>
            <hr>

            <ul class="nav nav-stacked ">
                <li class="active"><a href="#robots" data-toggle="tab"><i class="glyphicon glyphicon-flash"></i> My
                    robots</a></li>
                <li><a href="#diagrams" data-toggle="tab"><i class="glyphicon glyphicon-link"></i> My
                    Diagrams</a></li>
                <li><a href="#map" data-toggle="tab"><i class="glyphicon glyphicon-list-alt"></i> Map</a>
                </li>
                <li><a href="#settings" data-toggle="tab"><i class="glyphicon glyphicon-book"></i>
                    Settings</a></li>
            </ul>

            <hr>

        </div>


        <div class="col-sm-9">


            <h3><i class="glyphicon glyphicon-dashboard"></i> Dashboard</h3>


            <hr>

            <div id="myTabContent" class="tab-content">
                <div class="tab-pane active in" id="robots">


                    <div class="row">
                        <!-- center left-->

                        <c:forEach var="robot" items="${user.robots}">

                            <div class="modal fade" id="sendDiagramModal" tabindex="-1" role="dialog"
                                 aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close"
                                                    data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="sendDiagramLabel">Send diagram</h4>
                                        </div>
                                        <div class="modal-body">
                                            <h4>Select diagram</h4>
                                            <select class="form-control">
                                                <c:forEach var="diagram" items="${user.diagrams}">
                                                    <option>${diagram.name}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" name="sendDiagram" id="send-diagram-${robot.name}"
                                                    class="btn btn-primary">Send
                                            </button>
                                            <button type="button" class="btn btn-default"
                                                    data-dismiss="modal">Close
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6">

                                <div class="container-fluid well">
                                    <div class="row-fluid">
                                        <div class="col-md-4">

                                        <img src="http://vz.iminent.com/vz/ebbaaad3-77d8-4522-a8b7-45c10811941e/2/cute-rusty-robot-laughing.gif"
                                                 class="img-circle">
                                        </div>

                                        <div class="col-md-4">
                                            <h4>${robot.name}</h4>
                                            <h6>Status: offline</h6>


                                        </div>

                                        <div class="col-md-4">

                                            <div class="btn-group pull-right">
                                                <a class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                                                    <li class="glyphicon glyphicon-cog"></li>
                                                    Action
                                                    <span class="caret"></span>

                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" data-toggle="modal" data-target="#sendDiagramModal"><span
                                                            class="icon-wrench"></span> Send diagram</a>
                                                    </li>

                                                    <li><a href="#"><span class="icon-wrench"></span> Configure</a></li>
                                                    <li><a href='#' name="deleteRobot" id="delete-${robot.name}">
                                                        <span class="icon-trash"></span>
                                                        Delete
                                                    </a>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!--/col-span-6-->
                        </c:forEach>


                        <div class="col-md-6 ">
                            <div style="padding-top:2.8%;">


                                <a href="#" class="btn btn-info" data-toggle="modal" data-target="#myModal">
                                    <i class="glyphicon glyphicon-plus"></i><br/>
                                    Register robot
                                </a>

                                <div class="modal" id="myModal" tabindex="-1" role="dialog"
                                     aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close"><span aria-hidden="true">&times;</span>
                                                </button>
                                                <h4 class="modal-title" id="myModalLabel">Register new robot</h4>
                                            </div>
                                            <div class="modal-body">
                                                <form class="form form-vertical">
                                                    <div class="control-group">
                                                        <label>Name</label>

                                                        <div class="controls">
                                                            <input id="robotName" type="text" class="form-control"
                                                                   placeholder="Enter Name">
                                                        </div>
                                                    </div>
                                                    <br/>

                                                    <div class="control-group">
                                                        <label>Secret code</label>

                                                        <div class="controls">
                                                            <input id="secretCode" type="text" class="form-control"
                                                                   placeholder="Secret code">

                                                        </div>
                                                    </div>
                                                    <br/>

                                                </form>

                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="button" id="registerRobot" class="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="tab-pane" id="diagrams">
                    <h1>HERE WILL BE DIAGRAMS MANAGEMENT</h1>
                </div>


                <div class="tab-pane" id="map">

                    <div id="yamap" style="width: 100%; height: 600px"></div>
                    <button id="target">ADD LABEL</button>

                </div>
                <div class="tab-pane" id="settings">
                    <div class="col-md-8">
                        <div class="container-fluid">
                            <div class="row text-center">

                                <img width="350" height="350"
                                     src="http://d2pwjbxfeqzy45.cloudfront.net/wp-content/uploads/2013/10/coming-soon.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--/row-->
        </div>
    </div>


</div>


</body>

</html>
