module Controllers {

    export class diagramCtrl {

        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({ el: $('#paper'),
            width: 600,
            height: 400,
            gridSize: 1,
            model: this.graph
        });

        shapesList:Shape[] = [];
        currentShape:Shape;

        validateService:ValidateService;

        constructor($scope, validateService:ValidateService) {
            $scope.vm = this;
            this.validateService = validateService;

            this.paper.on('cell:pointerdblclick',
                function (cellView, evt, x, y) {
                    $('#action-select').remove();
                    $('#properties').attr("class", "col-md-6");
                    $scope.vm.shapesList.forEach(function (shape) {
                        if (shape.el.id == cellView.model.id) {
                            $scope.vm.currentShape = shape;
                            $('#text').val($scope.vm.currentShape.text);
                            $('#property1').val($scope.vm.currentShape.property1);
                            $('#property2').val($scope.vm.currentShape.property2);
                            $('#id').val($scope.vm.currentShape.id);
                            if (shape.type == NodeType.Button) {
                                $('#action').append($("<select>").attr("class", "form-control").attr("id", "action-select"));
                                for (var i in ButtonAction) {
                                    if (parseInt(i, 10) >= 0) {
                                        if (i == shape.action) {
                                            $('#action-select').append($("<option>").attr('value', i).text(ButtonAction[i]).attr('selected', 'selected'));
                                        } else {
                                            $('#action-select').append($("<option>").attr('value', i).text(ButtonAction[i]));
                                        }
                                    }
                                }
                            }
                            if (shape.type == NodeType.Input) {
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
                    if ($scope.vm.currentShape == null) {
                        alert("Current Shape is not defined");
                    } else {
                        $scope.vm.currentShape.el.remove();
                        $scope.vm.shapeList.splice($scope.vm.currentShape, $scope.vm.shapeList.indexOf($scope.vm.currentShape));
                    }
                }
            });
        }

        createInput() {
            this.shapesList.push(ShapesFactory.createInput(this.graph, null, "Unknown"));
        }

        createButton() {
            this.shapesList.push(ShapesFactory.createButton(this.graph, null, "Unknown"));
        }

        createInitialNode() {
            this.shapesList.push(ShapesFactory.createInitialNode(this.graph));
        }


        createLabel() {
            this.shapesList.push(ShapesFactory.createLabel(this.graph, null));
        }

        validate() {
            var res:string = this.validateService.validate(this.shapesList, this.graph);
            if (res.indexOf("passed") == -1 && res.indexOf("undefined") == -1) {
                alert(res);
            }
        }

        clear() {
            this.graph.clear();
        }

        updateValues() {
            this.currentShape.property1 = $('#property1').val();
            this.currentShape.property2 = $('#property2').val();
            this.currentShape.setText($('#text').val());
            this.currentShape.id = $('#id').val();

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
            var graph = this.graph;
            var th = this;
            var cnt:number = 0;
            var dy:number = 0;
            var dx:number = 0;
            var prev:number = 0;
            $.getJSON("graph.json")
                .done(function (json) {
                    json.nodes.forEach(function (node) {
                        switch (node.type) {
                            case "Button":
                                var button:Button = ShapesFactory.createButton(graph, node.id, node.action);
                                button.el.translate(90 * dx, 100 * dy);
                                th.shapesList.push(button);
                                break
                            case "Input":
                                var input:Input = ShapesFactory.createInput(graph, node.id, node.action);
                                input.el.translate(90 * dx, 100 * dy);
                                th.shapesList.push(input);
                                break
                            case "Label":
                                var label:Label = ShapesFactory.createLabel(graph, node.id);
                                label.el.translate(90 * dx, 100 * dy);
                                th.shapesList.push(label);
                                break
                            default:
                                alert('Unknown type')
                        }
                        ;
                        cnt++;
                        dx++;
                        prev = dy;
                        dy = (cnt - cnt % 6) / 6;
                        if (dy != prev) {
                            dx = 0;
                        }
                    });


                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    alert("Request Failed: " + err);
                });
        }
    }
}