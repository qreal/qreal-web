import mAction = module("designer/logic/Action");
import mActionTypes = module("designer/logic/ActionTypes");

export class PatientsRequestAction extends mAction.Action {
    private url: string;

    constructor(url: string) {
        super();
        this.ActionType = mActionTypes.ActionTypes.PatientsRequest;
        this.url = url;
    }

    public show(domeElement: JQuery) {
        var _this = this;
        var getPatientsBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Get patients from server</a>");
        domeElement.append(getPatientsBlock);
        getPatientsBlock.button();
        /*
        TODO: Add inline textfield for server url
        var textInput = $("<input type='text' data-mini='true' data-inline='true' value='" + this.url + "'  />");
        textInput.css("display", "inline !important");
        domeElement.append(textInput);
        textInput.textinput();
        textInput.change(function () {
            _this.url = textInput.val();
        });
        //domeElement.trigger("create");*/
    }

    get Url() {
        return this.url;
    }
    set Url(url: string) {
        this.url = url;
    }
    public toXML() {
        var xml = "<patients-request url='" + this.url + "' />\n";
        return xml;
    }
}