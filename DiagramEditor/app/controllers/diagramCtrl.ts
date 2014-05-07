module Controllers {

    export class diagramCtrl {

        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({ el: $('#paper'),
            width: 600,
            height: 400,
            gridSize: 1,
            model: this.graph
        });

        nodesList:Shape[] = [];

        currentNode:Shape;


        validateService:ValidateService;
        activities:string[] = [];
        json;

        constructor($scope, validateService:ValidateService) {
            $scope.vm = this;
            this.validateService = validateService;

            this.paper.on('cell:pointerdblclick',
                function (cellView, evt, x, y) {
                    $('#my-select').remove();
                    $('#properties').attr("class", "col-md-6");
                    $scope.vm.nodesList.forEach(function (shape) {
                        if (shape.el.id == cellView.model.id) {
                            $scope.vm.currentNode = shape;
                            $('#text').val($scope.vm.currentNode.text);
                            $('#id').val($scope.vm.currentNode.id);
                            if (shape.type == ServiceType[ServiceType.NavigationService]) {
                                $('#action').append($("<select>").attr("class", "form-control").attr("id", "my-select"));
                                $scope.vm.activities.forEach(function (activity) {
                                    if (activity == shape.activity) {
                                        $('#my-select').append($("<option>").attr('value', activity).text(activity).attr('selected', 'selected'));
                                    } else {
                                        $('#my-select').append($("<option>").attr('value', activity).text(activity));
                                    }
                                });

                            }
                            if (shape.type == ServiceType[ServiceType.GeolocationService]) {
                                console.log("GEOLOC");
                            }
                            if (shape.type == NodeType[NodeType.Button]) {
                                $('#action').append($("<select>").attr("class", "form-control").attr("id", "my-select"));
                                for (var i in ButtonAction) {
                                    if (parseInt(i, 10) >= 0) {
                                        if (ButtonAction[i] == shape.action) {
                                            $('#my-select').append($("<option>").attr('value', i).text(ButtonAction[i]).attr('selected', 'selected'));
                                        } else {
                                            $('#my-select').append($("<option>").attr('value', i).text(ButtonAction[i]));
                                        }
                                    }
                                }
                                $('#action').append($("<label>").text("Action"));
                            }
                            if (shape.type == NodeType[NodeType.Input]) {
                                $('#action').append($("<select>").attr("class", "form-control").attr("id", "action-select"));
                                for (var i in InputAction) {
                                    if (parseInt(i, 10) >= 0) {
                                        if (i == shape.action) {
                                            $('#action-select').append($("<option>").attr('value', i).text(InputAction[i]).attr('selected', 'selected'));
                                        } else {
                                            $('#action-select').append($("<option>").attr('value', i).text(InputAction[i]));
                                        }

                                    }
                                }
                            }
                        }
                    });
                }
            );


            this.graph.on('add', function (link) {
                link.on('change:source', function () {
                    $scope.vm.validate();
                });
                link.on('change:target', function () {
                    $scope.vm.validate();
                })
            });

            $('html').keyup(function (e) {
                if (e.keyCode == 46) {
                    if ($scope.vm.currentNode == null) {
                        alert("Current Shape is not defined");
                    } else {
                        $scope.vm.currentNode.el.remove();
                        $scope.vm.shapeList.splice($scope.vm.currentNode, $scope.vm.shapeList.indexOf($scope.vm.currentNode));
                    }
                }
            });
        }

        createInput() {
            this.nodesList.push(ShapesFactory.createInput(this.graph, null, "Unknown"));
        }

        createButton() {
            this.nodesList.push(ShapesFactory.createButton(this.graph, null, "Unknown"));
        }

        createInitialNode() {
            this.nodesList.push(ShapesFactory.createInitialNode(this.graph));
        }

        createLabel() {
            this.nodesList.push(ShapesFactory.createLabel(this.graph, null));
        }

        createNavigationService() {
            this.nodesList.push(ShapesFactory.createNavigationService(this.graph, null));

        }

        createGeolocationService() {
            this.nodesList.push(ShapesFactory.createGeolocationService(this.graph, null));
        }

        validate() {
            var res:string = this.validateService.validate(this.nodesList, this.graph);
            if (res.indexOf("passed") == -1 && res.indexOf("undefined") == -1) {
                alert(res);
            }
        }

        clear() {
            this.graph.clear();
        }

        updateValues() {
            this.currentNode.setText($('#text').val());
            this.currentNode.id = $('#id').val();
            if (this.currentNode.type == NodeType[NodeType.Button]) {
                var button:Button = this.anyTypeConvecter(this.currentNode);
                button.action = $('#my-select :selected').text();
            }
            if (this.currentNode.type == ServiceType[ServiceType.NavigationService]) {
                var navService:NavigationService = this.anyTypeConvecter(this.currentNode);
                navService.activity = $('#my-select :selected').text();
            }

            $('#alertblock').append($('<div>')
                    .attr('id', 'alert')
                    .attr('class', 'bg-success')
                    .text('Successfully updated')
            );
            $('#alert').append('<button type="button" class="close" data-dismiss="alert">&times;</button>')
        }

        close() {
            $('#properties').attr("class", "col-md-6 hidden");
        }

        uploadFromFile() {
            var th = this;
            $.getJSON("graph.json")
                .done(function (json) {
                    th.generateGraph(json, th.graph);
                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    alert("Request Failed: " + err);
                });
        }

        generateGraph(json, graph:joint.dia.Graph) {
            var graph = this.graph;
            this.json = json;
            graph.clear();
            this.nodesList = [];
            var th = this;
            var cnt:number = 0;
            var dy:number = 0;
            var dx:number = 0;
            var prev:number = 0;
            this.activities.push("Unknown");
            json.nodes.forEach(function (node) {
                switch (node.type) {
                    case "Button":
                        var button:Button = ShapesFactory.createButton(graph, node.id, node.action);
                        button.el.translate(90 * dx, 100 * dy);
                        th.nodesList.push(button);
                        break
                    case "Input":
                        var input:Input = ShapesFactory.createInput(graph, node.id, node.action);
                        input.el.translate(90 * dx, 100 * dy);
                        th.nodesList.push(input);
                        break
                    case "Label":
                        var label:Label = ShapesFactory.createLabel(graph, node.id);
                        label.el.translate(90 * dx, 100 * dy);
                        th.nodesList.push(label);
                        break
                    default:
                        alert('Unknown type')
                }
                cnt++;
                dx++;
                prev = dy;
                dy = (cnt - cnt % 6) / 6;
                if (dy != prev) {
                    dx = 0;
                }
            });

            json.activities.forEach(function (activity) {
                th.activities.push(activity.name);
            })

        }

        anyTypeConvecter(object) {
            return object;
        }


        export() {
            var cnt = 0;
            var th = this;
            th.json.services = [];
            this.nodesList.forEach(function (shape) {
                if (shape.type == ServiceType[ServiceType.NavigationService]) {
                    var navService:NavigationService = th.anyTypeConvecter(shape);
                    var service = {
                       id : navService.id,
                       type : navService.type,
                       activity : navService.activity
                    };
                    th.json.services[cnt] = service;
                    cnt++;
                }
            });

            cnt = 0;
            th.json.links = [];
            this.graph.getLinks().forEach(function (link) {
                var src = th.getNodeById(link.get('source').id);
                var trgt = th.getNodeById(link.get('target').id);
                var newLink = {
                    source : src.id,
                    target : trgt.id
                };
                th.json.links[cnt] = newLink;
            });

            alert(JSON.stringify(this.json));
        }

        getNodeById(id) {
            var el;
            this.nodesList.forEach(function (node) {
                if (node.getElement().id == id) {
                    console.log("NASHLI!!!");
                    el = node;
                    return;
                }
            });
            return el;
        }

}


}