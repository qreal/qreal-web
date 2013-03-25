import mAction = module("designer/logic/Action");

export class PatientsRequestAction extends mAction.Action {
    private url: string;

    constructor(url: string) {
        super();
        this.url = url;
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