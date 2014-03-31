define(["require", "exports"], function(require, exports) {
    var DialogHelper = (function () {
        function DialogHelper() {
        }
        DialogHelper.prototype.ShowProgress = function (title) {
            this.progressDialog = $('#templateProgressDialog').tmpl({ title: title });
            this.progressDialog.modal();
        };

        DialogHelper.prototype.HideProgress = function () {
            this.progressDialog.modal('hide');
        };
        return DialogHelper;
    })();

    
    return DialogHelper;
});
//# sourceMappingURL=DialogHelper.js.map
