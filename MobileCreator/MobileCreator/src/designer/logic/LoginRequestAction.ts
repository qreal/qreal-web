import mAction = module("designer/logic/Action");

export class LoginRequestAction extends mAction.Action {
    private url: string;
    private loginId: string;
    private passwordId: string;

    constructor(url: string, loginId: string, passwordId: string) {
        super();
        this.url = url;
        this.loginId = loginId;
        this.passwordId = passwordId;
    }

    get Url() {
        return this.url;
    }
    set Url(url: string) {
        this.url = url;
    }
    get LoginId() {
        return this.loginId;
    }
    set LoginId(loginId: string) {
        this.loginId = loginId;
    }
    get PasswordId() {
        return this.passwordId;
    }
    set PasswordId(passwordId: string) {
        this.passwordId = passwordId;
    }
    public toXML() {
        var xml = "<transition url='" + this.url + "' login-id='" + this.loginId + "' password-id='" + this.passwordId + "' />\n";
        return xml;
    }
}