class CheckerController {

    private lastResponse;

    constructor($scope, $compile, $attrs) {
        $scope.checker = this;
        $(document).ready(() => {
            $("#spinner").hide();
            $("#twoDModelContent").hide();
            $("#rerun").prop('disabled', true);
        });

        $scope.uploadFile = () => { this.uploadFile($scope) };

        $scope.showResult = () => {
            if (this.lastResponse) {
                $("#infoAlert").hide();
                $scope.$emit("emitCheckingResult", this.lastResponse);
            }
        }
    }

    uploadFile($scope) {
        this.lastResponse = null;
        $("#rerun").prop('disabled', true);
        var controller: CheckerController = this;
        var spinner = $('#spinner');
        spinner.show();
        $("#twoDModelContent").hide();
        $('#result').html('');

        $("#uploadForm").ajaxForm({
            dataType: "text",
            timeout: 60000,
            success: function (response) {
                spinner.hide();
                controller.lastResponse = JSON.parse(response);
                $("#rerun").prop('disabled', false);
                $('#result').html(controller.lastResponse.message);
                $scope.showResult();
            },
            error: function (response, status, error) {
                spinner.hide();
                if (status == "timeout") {
                    $('#result').html("Timed out – please try again");
                } else {
                    $('#result').html(response.responseText);
                }
            }
        }).submit();
    }
}