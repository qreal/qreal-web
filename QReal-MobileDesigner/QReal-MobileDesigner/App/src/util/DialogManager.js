define(["require", "exports"], function(require, exports) {
    var DialogManager = (function () {
        function DialogManager() {
        }
        DialogManager.prototype.ShowProgress = function (title) {
            this.progressDialog = $('#templateProgressDialog').tmpl({ title: title });
            this.progressDialog.modal();
        };

        DialogManager.prototype.HideProgress = function () {
            this.progressDialog.modal('hide');
        };
        return DialogManager;
    })();

    
    return DialogManager;
});
//# sourceMappingURL=DialogManager.js.map
