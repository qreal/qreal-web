class DialogManager {

    private progressDialog: JQuery;

    constructor() {

    }

    public ShowProgress(title: string): void {
        this.progressDialog = $('#templateProgressDialog').tmpl({ title: title });
        this.progressDialog.modal();
    }

    public HideProgress(): void {
        this.progressDialog.modal('hide');
    }
}

export = DialogManager;