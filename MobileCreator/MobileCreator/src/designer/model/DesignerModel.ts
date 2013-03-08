import mLog = module("utils/log/Log");
import mForm = module("designer/model/Form");

export class DesignerModel {
    private logger = new mLog.Logger("Designer");

    public static instance = new DesignerModel();

    constructor() {
    }

    private forms : mForm.Form[] = [];

    get Forms() {
        return this.forms;
    }

    public addForm(form: mForm.Form) {
        this.forms.push(form);
    }
    
    public deleteForm(formId : number) {
        var formToDel = -1;
        for (var i = 0; this.forms.length; i++) {
            if (formId == this.forms[i].Id) {
                formToDel = i;
            }
        }
        this.forms.splice(formToDel, 1);
    }
}