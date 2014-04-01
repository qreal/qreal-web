module Controllers {

    export class diagramCtrl {

        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({ el: $('#paper'),
            width: 600,
            height: 320,
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
                    $('#properties').attr("class", "col-md-6");
                    $scope.vm.shapesList.forEach(function (shape) {
                        if (shape.el.id == cellView.model.id) {
                            $scope.vm.currentShape = shape;
                            $('#text').val($scope.vm.currentShape.text);
                            $('#property1').val($scope.vm.currentShape.property1);
                            $('#property2').val($scope.vm.currentShape.property2);
                        }
                    });
                }
            );

            $('html').keyup(function (e) {
                if (e.keyCode == 46) {
                    if ($scope.vm.currentShape == null) {
                        alert("Current Shape is not defined");
                    } else {
                        $scope.vm.currentShape.el.remove();
                        $scope.vm.shapeList.splice($scope.vm.currentShape, $scope.vm.shapeList.indexOf($scope.vm.currentShape));
                        $scope.vm.close();
                    }
                }


            })
        }

        createFinalNode() {
            this.shapesList.push(ShapesFactory.createFinalNode(this.graph));
        }

        createActionNode() {
            this.shapesList.push(ShapesFactory.createActionNode(this.graph));
        }

        createInitialNode() {
            this.shapesList.push(ShapesFactory.createInitialNode(this.graph));
        }

        createConditionNode() {
            this.shapesList.push(ShapesFactory.createConditionNode(this.graph));
        }

        clear() {
            this.graph.clear();
        }

        updateValues() {
            this.currentShape.property1 = $('#property1').val();
            this.currentShape.property2 = $('#property2').val();
            this.currentShape.setText($('#text').val());

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

        validate() {
            alert(this.validateService.validate(this.shapesList, this.graph));
        }
    }
}