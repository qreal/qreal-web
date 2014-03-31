module Controllers {

    export class diagramCtrl {

        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({ el: $('#paper'),
            width: 600,
            height: 300,
            gridSize: 1,
            model: this.graph
        });
        msg = "hello";

        shapesList:Shape[] = [];
        currentShape:Shape;

        constructor($scope) {
            $scope.vm = this;

            var th = this;
            this.paper.on('cell:pointerdblclick',
                function (cellView, evt, x, y) {
                    $('#properties').attr("class", "col-md-6");
                    th.shapesList.forEach(function (shape) {
                        if (shape.el.id == cellView.model.id) {
                            th.currentShape = shape;
                            $('#text').val(th.currentShape.text);
                            $('#property1').val(th.currentShape.property1);
                            $('#property2').val(th.currentShape.property2);
                        }
                    });
                }
            );
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
    }
}