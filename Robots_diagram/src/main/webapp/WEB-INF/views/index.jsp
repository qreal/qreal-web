<%@ include file="include.jsp" %>

<head>
    <title>Robots Diagram</title>

    <jsp:include page="scripts.jsp"/>

    <link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/joint.css' />"/>
    <link rel="stylesheet" href="<c:url value='/resources/css/base.css' />"/>

    <link rel="stylesheet" href="<c:url value='/resources/treeview/jquery.treeview.css' />"/>
    <script type="text/javascript" src="<c:url value='/resources/treeview/jquery.treeview.js' />"></script>
</head>

<body ng-app="diagram" ng-controller="DiagramController">
<jsp:include page="navbar.jsp"/>


<div id="container">
    <div id="left-menu">
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

    <div id="paper">
    </div>

    <div id="right-menu">
        <legend style="padding: 10px">Palette</legend>
        <div id="elements_tree">
            <ul id="navigation">
            </ul>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        $("#navigation").treeview({
            persist: "location"
        });
    });
</script>
</body>
</html>