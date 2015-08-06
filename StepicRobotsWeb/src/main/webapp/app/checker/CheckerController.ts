class CheckerController {

    private lastResponse;

    constructor($scope, $compile, $attrs) {
        $scope.checker = this;
        $(document).ready(() => {
            $("#spinner").hide();
            $("#twoDModelContent").hide();
            $("#showResult").prop('disabled', true);
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
        $("#showResult").prop('disabled', true);
        var controller: CheckerController = this;
        var spinner = $('#spinner');
        spinner.show();
        $("#twoDModelContent").hide();
        $('#result').html('');

        $("#uploadForm").ajaxForm({
            dataType: "text",
            success: function (response) {
                spinner.hide();
                controller.lastResponse = JSON.parse(response);
                $("#showResult").prop('disabled', false);
                $('#result').html("Your file successfully uploaded and checked");
            },
            error: function (response, status, error) {
                spinner.hide();
                $('#result').html(response.responseText);
            }
        }).submit();
    }
}