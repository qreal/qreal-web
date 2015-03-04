module Controllers {

    export class TwoDModelController {

        constructor($scope, $compile) {
            $scope.vm = this;
            $(document).ready(function(){
                var stage = new PIXI.Stage(0xFFFFFF);
                var renderer = PIXI.autoDetectRenderer($("#stage").width(), $("#stage").height());
                $("#stage").append(renderer.view);
                requestAnimFrame( animate );

                function animate() {
                    requestAnimFrame( animate );
                    renderer.render(stage);
                }
            });
        }
    }
}